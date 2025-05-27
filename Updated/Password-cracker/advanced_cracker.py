"""
Advanced password cracker implementation with additional features.
"""
import logging
import time
import itertools
import string
from typing import Optional, List, Dict, Set
from pathlib import Path
import argparse
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

from base_cracker import BaseCracker
from utils import (
    SecurityError,
    log_security_event,
    calculate_entropy,
    sanitize_output
)
from config import (
    WORDLISTS_DIR,
    HASHES_DIR,
    RESULTS_DIR,
    MAX_THREADS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
)

logger = logging.getLogger(__name__)

class AdvancedCracker(BaseCracker):
    """Advanced password cracker with additional features."""
    
    def __init__(self, algorithm: str):
        """Initialize advanced cracker with additional features."""
        super().__init__(algorithm)
        self.character_sets = {
            'lowercase': string.ascii_lowercase,
            'uppercase': string.ascii_uppercase,
            'digits': string.digits,
            'special': string.punctuation
        }
        self.known_patterns = {
            'dates': self._generate_date_patterns(),
            'common_words': self._load_common_words(),
            'keyboard_patterns': self._generate_keyboard_patterns()
        }
    
    def _generate_date_patterns(self) -> Set[str]:
        """Generate common date patterns."""
        patterns = set()
        years = range(1900, 2025)
        months = range(1, 13)
        days = range(1, 32)
        
        # YYYYMMDD
        for year in years:
            for month in months:
                for day in days:
                    patterns.add(f"{year}{month:02d}{day:02d}")
        
        # DDMMYYYY
        for day in days:
            for month in months:
                for year in years:
                    patterns.add(f"{day:02d}{month:02d}{year}")
        
        return patterns
    
    def _load_common_words(self) -> Set[str]:
        """Load common words from wordlist."""
        try:
            wordlist_path = WORDLISTS_DIR / 'common_words.txt'
            with open(wordlist_path, 'r', encoding='utf-8') as f:
                return {line.strip().lower() for line in f if line.strip()}
        except Exception as e:
            logger.warning(f"Failed to load common words: {str(e)}")
            return set()
    
    def _generate_keyboard_patterns(self) -> Set[str]:
        """Generate common keyboard patterns."""
        patterns = set()
        rows = [
            'qwertyuiop',
            'asdfghjkl',
            'zxcvbnm'
        ]
        
        # Horizontal patterns
        for row in rows:
            for i in range(len(row) - 2):
                patterns.add(row[i:i+3])
        
        # Vertical patterns
        for i in range(len(rows[0])):
            pattern = ''
            for row in rows:
                if i < len(row):
                    pattern += row[i]
            if len(pattern) >= 3:
                patterns.add(pattern)
        
        return patterns
    
    def crack_hash(self, target_hash: str, wordlist_path: Path) -> Optional[str]:
        """
        Attempt to crack a hash using advanced techniques.
        
        Args:
            target_hash: Hash to crack
            wordlist_path: Path to wordlist file
        
        Returns:
            Optional[str]: Cracked password if found, None otherwise
        """
        try:
            # Validate inputs
            self.validate_hash(target_hash)
            
            # Load wordlist
            passwords = self.load_wordlist(wordlist_path)
            logger.info(f"Loaded {len(passwords)} passwords from wordlist")
            
            # Start cracking
            self.start_time = time.time()
            logger.info(f"Starting advanced attack on {self.algorithm} hash")
            
            # Try wordlist first
            result = self._try_wordlist(target_hash, passwords)
            if result:
                return result
            
            # Try common patterns
            result = self._try_patterns(target_hash)
            if result:
                return result
            
            # Try brute force with common character sets
            result = self._try_brute_force(target_hash)
            if result:
                return result
            
            logger.warning("Password not found using advanced techniques")
            return None
        
        except Exception as e:
            logger.error(f"Advanced cracking failed: {str(e)}")
            raise SecurityError(f"Failed to crack hash: {str(e)}")
    
    def _try_wordlist(self, target_hash: str, passwords: List[str]) -> Optional[str]:
        """Try cracking using wordlist with variations."""
        try:
            # Try original passwords
            for password in passwords:
                if self.stop_flag.is_set():
                    break
                
                if self.check_timeout() or self.check_attempts():
                    break
                
                if self.check_password(password, target_hash):
                    return password
                
                # Try common variations
                variations = self._generate_variations(password)
                for variation in variations:
                    if self.check_password(variation, target_hash):
                        return variation
            
            return None
        
        except Exception as e:
            logger.error(f"Wordlist attack failed: {str(e)}")
            return None
    
    def _generate_variations(self, password: str) -> List[str]:
        """Generate common password variations."""
        variations = []
        
        # Case variations
        variations.append(password.lower())
        variations.append(password.upper())
        variations.append(password.capitalize())
        
        # Common substitutions
        substitutions = {
            'a': '@', 'e': '3', 'i': '1', 'o': '0',
            's': '$', 't': '7', 'l': '1', 'b': '8'
        }
        
        for char, sub in substitutions.items():
            if char in password.lower():
                variations.append(password.lower().replace(char, sub))
        
        # Add common suffixes
        suffixes = ['123', '!', '?', '1', '1234', '2023', '2024']
        for suffix in suffixes:
            variations.append(password + suffix)
        
        return variations
    
    def _try_patterns(self, target_hash: str) -> Optional[str]:
        """Try cracking using known patterns."""
        try:
            # Try date patterns
            for pattern in self.known_patterns['dates']:
                if self.stop_flag.is_set():
                    break
                
                if self.check_timeout() or self.check_attempts():
                    break
                
                if self.check_password(pattern, target_hash):
                    return pattern
            
            # Try keyboard patterns
            for pattern in self.known_patterns['keyboard_patterns']:
                if self.stop_flag.is_set():
                    break
                
                if self.check_timeout() or self.check_attempts():
                    break
                
                if self.check_password(pattern, target_hash):
                    return pattern
            
            return None
        
        except Exception as e:
            logger.error(f"Pattern attack failed: {str(e)}")
            return None
    
    def _try_brute_force(self, target_hash: str) -> Optional[str]:
        """Try brute force with common character sets."""
        try:
            # Start with shorter lengths and common character sets
            for length in range(4, 9):
                if self.stop_flag.is_set():
                    break
                
                if self.check_timeout() or self.check_attempts():
                    break
                
                # Try lowercase + digits first
                result = self._brute_force_length(
                    target_hash,
                    length,
                    self.character_sets['lowercase'] + self.character_sets['digits']
                )
                if result:
                    return result
            
            return None
        
        except Exception as e:
            logger.error(f"Brute force attack failed: {str(e)}")
            return None
    
    def _brute_force_length(self, target_hash: str, length: int, charset: str) -> Optional[str]:
        """Brute force passwords of specific length."""
        try:
            with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
                futures = []
                
                # Split work among threads
                chunk_size = len(charset) // MAX_THREADS
                for i in range(0, len(charset), chunk_size):
                    chunk = charset[i:i + chunk_size]
                    futures.append(
                        executor.submit(
                            self._brute_force_chunk,
                            target_hash,
                            length,
                            chunk,
                            charset
                        )
                    )
                
                # Check results
                for future in as_completed(futures):
                    result = future.result()
                    if result:
                        return result
            
            return None
        
        except Exception as e:
            logger.error(f"Brute force length failed: {str(e)}")
            return None
    
    def _brute_force_chunk(self, target_hash: str, length: int, start_chars: str, charset: str) -> Optional[str]:
        """Brute force a chunk of possible passwords."""
        try:
            for combo in itertools.product(start_chars, *[charset] * (length - 1)):
                if self.stop_flag.is_set():
                    break
                
                if self.check_timeout() or self.check_attempts():
                    break
                
                password = ''.join(combo)
                if self.check_password(password, target_hash):
                    return password
            
            return None
        
        except Exception as e:
            logger.error(f"Brute force chunk failed: {str(e)}")
            return None
    
    def analyze_password(self, password: str) -> Dict:
        """
        Analyze password strength.
        
        Args:
            password: Password to analyze
        
        Returns:
            Dict: Analysis results
        """
        try:
            # Calculate entropy
            entropy = calculate_entropy(password)
            
            # Check character types
            has_lower = any(c.islower() for c in password)
            has_upper = any(c.isupper() for c in password)
            has_digit = any(c.isdigit() for c in password)
            has_special = any(c in string.punctuation for c in password)
            
            # Check length
            length = len(password)
            
            # Check for common patterns
            is_common_word = password.lower() in self.known_patterns['common_words']
            is_date_pattern = password in self.known_patterns['dates']
            is_keyboard_pattern = password in self.known_patterns['keyboard_patterns']
            
            # Calculate strength score
            strength_score = 0
            strength_score += length * 4
            strength_score += entropy * 2
            strength_score += 10 if has_lower else 0
            strength_score += 10 if has_upper else 0
            strength_score += 10 if has_digit else 0
            strength_score += 15 if has_special else 0
            strength_score -= 20 if is_common_word else 0
            strength_score -= 15 if is_date_pattern else 0
            strength_score -= 15 if is_keyboard_pattern else 0
            
            return {
                'length': length,
                'entropy': entropy,
                'has_lowercase': has_lower,
                'has_uppercase': has_upper,
                'has_digits': has_digit,
                'has_special': has_special,
                'is_common_word': is_common_word,
                'is_date_pattern': is_date_pattern,
                'is_keyboard_pattern': is_keyboard_pattern,
                'strength_score': strength_score,
                'strength_level': self._get_strength_level(strength_score)
            }
        
        except Exception as e:
            logger.error(f"Password analysis failed: {str(e)}")
            raise SecurityError(f"Failed to analyze password: {str(e)}")
    
    def _get_strength_level(self, score: float) -> str:
        """Get password strength level based on score."""
        if score >= 80:
            return 'Very Strong'
        elif score >= 60:
            return 'Strong'
        elif score >= 40:
            return 'Moderate'
        elif score >= 20:
            return 'Weak'
        else:
            return 'Very Weak'

def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='Advanced Password Cracker - Educational Tool',
        epilog='LEGAL NOTICE: Only use on passwords you own or have permission to test!'
    )
    
    parser.add_argument(
        'mode',
        choices=['crack', 'analyze', 'demo'],
        help='Mode of operation'
    )
    
    parser.add_argument(
        '-t', '--target',
        help='Target hash to crack or password to analyze'
    )
    
    parser.add_argument(
        '-f', '--file',
        help='File containing hashes to crack'
    )
    
    parser.add_argument(
        '-w', '--wordlist',
        default=WORDLISTS_DIR / 'common_passwords.txt',
        help='Wordlist file path'
    )
    
    parser.add_argument(
        '-a', '--algorithm',
        default='sha256',
        choices=['md5', 'sha1', 'sha256', 'sha512', 'bcrypt'],
        help='Hash algorithm'
    )
    
    args = parser.parse_args()
    
    try:
        print("""
╔═══════════════════════════════════════════════════════════════╗
║               ADVANCED PASSWORD CRACKER v1.0                  ║
║                  Educational Tool Only                        ║
║         Only use on authorized systems!                       ║
╚═══════════════════════════════════════════════════════════════╝
        """)
        
        cracker = AdvancedCracker(args.algorithm)
        
        if args.mode == 'analyze':
            if not args.target:
                print("[!] Please provide a password to analyze (-t)")
                sys.exit(1)
            
            print("[*] Analyzing password strength...")
            analysis = cracker.analyze_password(args.target)
            
            print("\nPassword Analysis Results:")
            print(f"Length: {analysis['length']}")
            print(f"Entropy: {analysis['entropy']:.2f}")
            print(f"Character Types:")
            print(f"  - Lowercase: {'Yes' if analysis['has_lowercase'] else 'No'}")
            print(f"  - Uppercase: {'Yes' if analysis['has_uppercase'] else 'No'}")
            print(f"  - Digits: {'Yes' if analysis['has_digits'] else 'No'}")
            print(f"  - Special: {'Yes' if analysis['has_special'] else 'No'}")
            print(f"Patterns:")
            print(f"  - Common Word: {'Yes' if analysis['is_common_word'] else 'No'}")
            print(f"  - Date Pattern: {'Yes' if analysis['is_date_pattern'] else 'No'}")
            print(f"  - Keyboard Pattern: {'Yes' if analysis['is_keyboard_pattern'] else 'No'}")
            print(f"Strength Score: {analysis['strength_score']}")
            print(f"Strength Level: {analysis['strength_level']}")
        
        elif args.mode == 'demo':
            print("[*] Running demo mode...")
            demo_password = 'Password123!'
            print(f"[*] Demo: Analyzing password '{demo_password}'")
            
            analysis = cracker.analyze_password(demo_password)
            print(f"\nDemo Analysis:")
            print(f"Strength Level: {analysis['strength_level']}")
            print(f"Strength Score: {analysis['strength_score']}")
        
        elif args.mode == 'crack':
            if not args.target and not args.file:
                print("[!] Please provide a target hash (-t) or hash file (-f)")
                sys.exit(1)
            
            if args.target:
                result = cracker.crack_hash(args.target, args.wordlist)
                if result:
                    print(f"[+] Password found: {result}")
                else:
                    print("[-] Password not found using advanced techniques")
            
            elif args.file:
                cracker.crack_multiple(args.file, args.wordlist)
        
        cracker.cleanup()
    
    except SecurityError as e:
        print(f"[!] Security Error: {str(e)}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n[!] Operation cancelled by user")
        sys.exit(0)
    except Exception as e:
        print(f"[!] Error: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main() 