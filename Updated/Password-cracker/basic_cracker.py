"""
Basic password cracker implementation.
"""
import logging
import time
from typing import Optional, List
from pathlib import Path
import argparse
import sys

from base_cracker import BaseCracker
from utils import SecurityError, log_security_event
from config import (
    WORDLISTS_DIR,
    HASHES_DIR,
    RESULTS_DIR,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
)

logger = logging.getLogger(__name__)

class BasicCracker(BaseCracker):
    """Basic password cracker implementation."""
    
    def crack_hash(self, target_hash: str, wordlist_path: Path) -> Optional[str]:
        """
        Attempt to crack a hash using a wordlist.
        
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
            logger.info(f"Starting dictionary attack on {self.algorithm} hash")
            
            for password in passwords:
                if self.stop_flag.is_set():
                    break
                
                if self.check_timeout() or self.check_attempts():
                    break
                
                if self.check_password(password, target_hash):
                    self.found_passwords[target_hash] = password
                    self.log_attempt(password, True)
                    logger.info(f"Password found: {password}")
                    return password
                
                self.log_attempt(password, False)
            
            logger.warning("Password not found in wordlist")
            return None
        
        except Exception as e:
            logger.error(f"Cracking failed: {str(e)}")
            raise SecurityError(f"Failed to crack hash: {str(e)}")
    
    def crack_multiple(self, hash_file: Path, wordlist_path: Path) -> None:
        """
        Crack multiple hashes from a file.
        
        Args:
            hash_file: File containing hashes
            wordlist_path: Path to wordlist file
        """
        try:
            # Load hashes
            content = secure_file_operation(hash_file)
            hashes = [line.strip() for line in content.splitlines() if line.strip()]
            logger.info(f"Loaded {len(hashes)} hashes from file")
            
            # Start cracking
            self.start_time = time.time()
            for i, target_hash in enumerate(hashes, 1):
                if self.stop_flag.is_set():
                    break
                
                logger.info(f"Cracking hash {i}/{len(hashes)}")
                self.attempts = 0
                
                result = self.crack_hash(target_hash, wordlist_path)
                if result:
                    self.found_passwords[target_hash] = result
            
            # Save results
            if self.found_passwords:
                output_path = RESULTS_DIR / f"cracked_{int(time.time())}.json"
                self.save_results(output_path)
            
            # Log summary
            logger.info(f"Cracked {len(self.found_passwords)}/{len(hashes)} hashes")
        
        except Exception as e:
            logger.error(f"Multiple hash cracking failed: {str(e)}")
            raise SecurityError(f"Failed to crack multiple hashes: {str(e)}")

def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='Basic Password Cracker - Educational Tool',
        epilog='LEGAL NOTICE: Only use on passwords you own or have permission to test!'
    )
    
    parser.add_argument(
        'mode',
        choices=['crack', 'generate', 'demo'],
        help='Mode of operation'
    )
    
    parser.add_argument(
        '-t', '--target',
        help='Target hash to crack'
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
║                   PASSWORD CRACKER v1.0                       ║
║                  Educational Tool Only                        ║
║         Only use on authorized systems!                       ║
╚═══════════════════════════════════════════════════════════════╝
        """)
        
        cracker = BasicCracker(args.algorithm)
        
        if args.mode == 'generate':
            from utils import hash_password
            test_passwords = [
                'password', '123456', 'admin', 'letmein', 'monkey',
                'qwerty', 'dragon', 'baseball', 'iloveyou', 'sunshine'
            ]
            
            print("[*] Generating sample hashes for testing...")
            for pwd in test_passwords:
                hash_value = hash_password(pwd, args.algorithm)
                print(f"  {pwd:<15} -> {hash_value}")
        
        elif args.mode == 'demo':
            print("[*] Running demo mode...")
            demo_hash = hash_password('password', args.algorithm)
            print(f"[*] Demo: Cracking {args.algorithm} hash of 'password'")
            
            result = cracker.crack_hash(demo_hash, args.wordlist)
            if result:
                print(f"[+] Successfully cracked: {result}")
            else:
                print("[-] Demo completed without finding password")
        
        elif args.mode == 'crack':
            if not args.target and not args.file:
                print("[!] Please provide a target hash (-t) or hash file (-f)")
                sys.exit(1)
            
            if args.target:
                result = cracker.crack_hash(args.target, args.wordlist)
                if result:
                    print(f"[+] Password found: {result}")
                else:
                    print("[-] Password not found in wordlist")
            
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