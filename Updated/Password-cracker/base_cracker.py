"""
Base class for password cracking implementations.
"""
import logging
import time
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any, List
from pathlib import Path
import threading
from queue import Queue
import json

from config import (
    MAX_ATTEMPTS,
    RATE_LIMIT,
    MAX_THREADS,
    TIMEOUT,
    SUPPORTED_HASHES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
)
from utils import (
    SecurityError,
    validate_input,
    hash_password,
    verify_password,
    rate_limit,
    secure_file_operation,
    sanitize_output,
    log_security_event
)

logger = logging.getLogger(__name__)

class BaseCracker(ABC):
    """Base class for password cracking implementations."""
    
    def __init__(self, algorithm: str = 'sha256'):
        """
        Initialize the password cracker.
        
        Args:
            algorithm: Hash algorithm to use
        """
        if algorithm not in SUPPORTED_HASHES:
            raise SecurityError(f"Unsupported algorithm: {algorithm}")
        
        self.algorithm = algorithm
        self.attempts = 0
        self.start_time = 0
        self.stop_flag = threading.Event()
        self.lock = threading.Lock()
        self.found_passwords: Dict[str, str] = {}
        self.rate_limiter = threading.Semaphore(RATE_LIMIT)
    
    @abstractmethod
    def crack_hash(self, target_hash: str, wordlist_path: Path) -> Optional[str]:
        """
        Attempt to crack a hash using a wordlist.
        
        Args:
            target_hash: Hash to crack
            wordlist_path: Path to wordlist file
        
        Returns:
            Optional[str]: Cracked password if found, None otherwise
        """
        pass
    
    def validate_hash(self, target_hash: str) -> bool:
        """
        Validate hash format.
        
        Args:
            target_hash: Hash to validate
        
        Returns:
            bool: True if valid
        
        Raises:
            SecurityError: If hash is invalid
        """
        try:
            validate_input(target_hash, 'hash')
            return True
        except SecurityError as e:
            logger.error(f"Hash validation failed: {str(e)}")
            raise
    
    @rate_limit
    def check_password(self, password: str, target_hash: str) -> bool:
        """
        Check if password matches target hash.
        
        Args:
            password: Password to check
            target_hash: Hash to check against
        
        Returns:
            bool: True if password matches hash
        """
        try:
            with self.rate_limiter:
                self.attempts += 1
                return verify_password(password, target_hash, self.algorithm)
        except Exception as e:
            logger.error(f"Password check failed: {str(e)}")
            return False
    
    def load_wordlist(self, wordlist_path: Path) -> List[str]:
        """
        Load and validate wordlist.
        
        Args:
            wordlist_path: Path to wordlist file
        
        Returns:
            List[str]: List of passwords
        
        Raises:
            SecurityError: If wordlist loading fails
        """
        try:
            content = secure_file_operation(wordlist_path)
            passwords = [line.strip() for line in content.splitlines() if line.strip()]
            
            # Validate each password
            valid_passwords = []
            for pwd in passwords:
                try:
                    validate_input(pwd, 'password')
                    valid_passwords.append(pwd)
                except SecurityError:
                    continue
            
            return valid_passwords
        
        except Exception as e:
            logger.error(f"Wordlist loading failed: {str(e)}")
            raise SecurityError(f"Failed to load wordlist: {str(e)}")
    
    def check_timeout(self) -> bool:
        """
        Check if operation has timed out.
        
        Returns:
            bool: True if timed out
        """
        if time.time() - self.start_time > TIMEOUT:
            logger.warning("Operation timed out")
            return True
        return False
    
    def check_attempts(self) -> bool:
        """
        Check if maximum attempts reached.
        
        Returns:
            bool: True if max attempts reached
        """
        if self.attempts >= MAX_ATTEMPTS:
            logger.warning("Maximum attempts reached")
            return True
        return False
    
    def save_results(self, output_path: Path) -> None:
        """
        Save cracking results securely.
        
        Args:
            output_path: Path to save results
        
        Raises:
            SecurityError: If saving fails
        """
        try:
            results = {
                'algorithm': self.algorithm,
                'attempts': self.attempts,
                'time_elapsed': time.time() - self.start_time,
                'found_passwords': sanitize_output(self.found_passwords)
            }
            
            with open(output_path, 'w') as f:
                json.dump(results, f, indent=2)
            
            logger.info(f"Results saved to {output_path}")
        
        except Exception as e:
            logger.error(f"Failed to save results: {str(e)}")
            raise SecurityError(f"Failed to save results: {str(e)}")
    
    def log_attempt(self, password: str, success: bool) -> None:
        """
        Log password attempt.
        
        Args:
            password: Password attempted
            success: Whether attempt was successful
        """
        log_security_event(
            'password_attempt',
            {
                'password': password,
                'success': success,
                'attempts': self.attempts,
                'time_elapsed': time.time() - self.start_time
            }
        )
    
    def cleanup(self) -> None:
        """Clean up resources."""
        self.stop_flag.set()
        self.attempts = 0
        self.found_passwords.clear() 