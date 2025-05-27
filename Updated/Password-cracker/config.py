"""
Configuration settings for the Password Cracker project.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Project paths
BASE_DIR = Path(__file__).resolve().parent
WORDLISTS_DIR = BASE_DIR / 'wordlists'
HASHES_DIR = BASE_DIR / 'hashes'
RESULTS_DIR = BASE_DIR / 'results'
LOGS_DIR = BASE_DIR / 'logs'

# Create necessary directories
for directory in [WORDLISTS_DIR, HASHES_DIR, RESULTS_DIR, LOGS_DIR]:
    directory.mkdir(exist_ok=True)

# Security settings
MAX_ATTEMPTS = int(os.getenv('MAX_ATTEMPTS', '1000000'))
RATE_LIMIT = int(os.getenv('RATE_LIMIT', '1000'))  # attempts per second
MAX_THREADS = int(os.getenv('MAX_THREADS', '8'))
TIMEOUT = int(os.getenv('TIMEOUT', '300'))  # seconds

# Hash settings
SUPPORTED_HASHES = {
    'md5': 'MD5',
    'sha1': 'SHA-1',
    'sha256': 'SHA-256',
    'sha512': 'SHA-512',
    'bcrypt': 'BCrypt'
}

# Security headers
SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'",
    'Referrer-Policy': 'strict-origin-when-cross-origin'
}

# Logging configuration
LOG_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'file': {
            'class': 'logging.FileHandler',
            'filename': LOGS_DIR / 'password_cracker.log',
            'formatter': 'standard',
            'level': 'INFO',
        },
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'level': 'INFO',
        },
    },
    'loggers': {
        '': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True
        }
    }
}

# Input validation patterns
VALIDATION_PATTERNS = {
    'hash': r'^[a-fA-F0-9]{32,128}$',  # MD5 to SHA-512
    'bcrypt': r'^\$2[aby]\$\d+\$[./A-Za-z0-9]{53}$',
    'password': r'^[\x20-\x7E]{8,128}$'  # Printable ASCII, 8-128 chars
}

# Error messages
ERROR_MESSAGES = {
    'invalid_hash': 'Invalid hash format',
    'invalid_password': 'Invalid password format',
    'rate_limit': 'Rate limit exceeded',
    'timeout': 'Operation timed out',
    'unauthorized': 'Unauthorized access attempt',
    'file_not_found': 'File not found',
    'permission_denied': 'Permission denied'
}

# Success messages
SUCCESS_MESSAGES = {
    'password_found': 'Password found',
    'analysis_complete': 'Analysis complete',
    'operation_success': 'Operation completed successfully'
} 