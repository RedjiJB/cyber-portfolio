"""
Utility functions for the Password Cracker project.
"""
import re
import logging
import hashlib
import bcrypt
import time
from typing import Optional, Dict, Any
from pathlib import Path
import json
from config import VALIDATION_PATTERNS, ERROR_MESSAGES

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SecurityError(Exception):
    """Custom exception for security-related errors."""
    pass

def validate_input(input_str: str, input_type: str) -> bool:
    """
    Validate input against predefined patterns.
    
    Args:
        input_str: The input string to validate
        input_type: Type of input ('hash', 'password', 'bcrypt')
    
    Returns:
        bool: True if valid, False otherwise
    
    Raises:
        SecurityError: If input validation fails
    """
    if not isinstance(input_str, str):
        raise SecurityError("Input must be a string")
    
    pattern = VALIDATION_PATTERNS.get(input_type)
    if not pattern:
        raise SecurityError(f"Unknown input type: {input_type}")
    
    if not re.match(pattern, input_str):
        raise SecurityError(ERROR_MESSAGES[f'invalid_{input_type}'])
    
    return True

def hash_password(password: str, algorithm: str = 'sha256') -> str:
    """
    Hash a password using the specified algorithm.
    
    Args:
        password: The password to hash
        algorithm: Hash algorithm to use
    
    Returns:
        str: Hashed password
    
    Raises:
        SecurityError: If hashing fails
    """
    try:
        validate_input(password, 'password')
        
        if algorithm == 'bcrypt':
            salt = bcrypt.gensalt()
            return bcrypt.hashpw(password.encode(), salt).decode()
        
        hash_func = getattr(hashlib, algorithm.lower(), None)
        if not hash_func:
            raise SecurityError(f"Unsupported algorithm: {algorithm}")
        
        return hash_func(password.encode()).hexdigest()
    
    except Exception as e:
        logger.error(f"Error hashing password: {str(e)}")
        raise SecurityError(f"Password hashing failed: {str(e)}")

def verify_password(password: str, hashed: str, algorithm: str = 'sha256') -> bool:
    """
    Verify a password against its hash.
    
    Args:
        password: The password to verify
        hashed: The hash to verify against
        algorithm: Hash algorithm used
    
    Returns:
        bool: True if password matches hash
    
    Raises:
        SecurityError: If verification fails
    """
    try:
        validate_input(password, 'password')
        
        if algorithm == 'bcrypt':
            return bcrypt.checkpw(password.encode(), hashed.encode())
        
        return hash_password(password, algorithm) == hashed
    
    except Exception as e:
        logger.error(f"Error verifying password: {str(e)}")
        raise SecurityError(f"Password verification failed: {str(e)}")

def rate_limit(func):
    """
    Decorator to implement rate limiting.
    
    Args:
        func: Function to decorate
    
    Returns:
        Decorated function
    """
    last_call = {}
    
    def wrapper(*args, **kwargs):
        current_time = time.time()
        if func.__name__ in last_call:
            time_diff = current_time - last_call[func.__name__]
            if time_diff < 1.0:  # 1 second minimum between calls
                raise SecurityError(ERROR_MESSAGES['rate_limit'])
        last_call[func.__name__] = current_time
        return func(*args, **kwargs)
    
    return wrapper

def secure_file_operation(file_path: Path, mode: str = 'r') -> Any:
    """
    Perform secure file operations with proper error handling.
    
    Args:
        file_path: Path to the file
        mode: File open mode
    
    Returns:
        File object or content
    
    Raises:
        SecurityError: If file operation fails
    """
    try:
        if not file_path.exists():
            raise SecurityError(ERROR_MESSAGES['file_not_found'])
        
        if not os.access(file_path, os.R_OK):
            raise SecurityError(ERROR_MESSAGES['permission_denied'])
        
        with open(file_path, mode) as f:
            if mode == 'r':
                return f.read()
            return f
    
    except Exception as e:
        logger.error(f"File operation error: {str(e)}")
        raise SecurityError(f"File operation failed: {str(e)}")

def sanitize_output(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Sanitize output data to prevent sensitive information leakage.
    
    Args:
        data: Dictionary containing output data
    
    Returns:
        Dict: Sanitized data
    """
    sanitized = data.copy()
    
    # Mask sensitive fields
    sensitive_fields = ['password', 'hash', 'token', 'key']
    for field in sensitive_fields:
        if field in sanitized:
            sanitized[field] = '*' * len(str(sanitized[field]))
    
    return sanitized

def log_security_event(event_type: str, details: Dict[str, Any]) -> None:
    """
    Log security-related events.
    
    Args:
        event_type: Type of security event
        details: Event details
    """
    try:
        log_entry = {
            'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
            'event_type': event_type,
            'details': sanitize_output(details)
        }
        
        logger.info(f"Security Event: {json.dumps(log_entry)}")
    
    except Exception as e:
        logger.error(f"Error logging security event: {str(e)}")

def calculate_entropy(password: str) -> float:
    """
    Calculate password entropy in bits.
    
    Args:
        password: Password to analyze
    
    Returns:
        float: Entropy in bits
    """
    if not password:
        return 0.0
    
    # Count character types
    char_sets = {
        'lowercase': len(re.findall(r'[a-z]', password)),
        'uppercase': len(re.findall(r'[A-Z]', password)),
        'digits': len(re.findall(r'[0-9]', password)),
        'special': len(re.findall(r'[^a-zA-Z0-9]', password))
    }
    
    # Calculate pool size
    pool_size = sum(1 for count in char_sets.values() if count > 0)
    if pool_size == 0:
        return 0.0
    
    # Calculate entropy
    entropy = len(password) * math.log2(pool_size)
    return round(entropy, 2) 