"""
Flask web application for the Password Cracker project.
"""
from flask import Flask, render_template, request, jsonify, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
import hashlib
import bcrypt
import os
import logging
from logging.handlers import RotatingFileHandler
import json
from typing import Dict, Any, Optional
from middleware import SecurityMiddleware

# Initialize Flask app
app = Flask(__name__)

# Configure logging
if not os.path.exists('logs'):
    os.makedirs('logs')

file_handler = RotatingFileHandler('logs/app.log', maxBytes=10240, backupCount=10)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
))
file_handler.setLevel(logging.INFO)
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)
app.logger.info('Password Cracker startup')

# Load configuration
with open('config.json', 'r') as f:
    config = json.load(f)

# Initialize security middleware
security = SecurityMiddleware(app)

# Known hashes for demo mode (DO NOT USE IN PRODUCTION)
DEMO_HASHES = {
    '5f4dcc3b5aa765d61d8327deb882cf99': 'password',  # MD5
    '7c6a180b36896a0a8c02787eeafb0e4c': '6cb75f652a9b52798eb6cf2201057c73',  # SHA-1
    '6cb75f652a9b52798eb6cf2201057c73': 'password1',  # SHA-256
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBAQNxKxJ5J5Hy': 'password123'  # BCrypt
}

def analyze_password(password: str) -> Dict[str, Any]:
    """Analyze password strength and return detailed metrics"""
    if not password:
        return {'error': 'Password is required'}, 400
    
    # Calculate metrics
    length = len(password)
    has_lower = any(c.islower() for c in password)
    has_upper = any(c.isupper() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(not c.isalnum() for c in password)
    
    # Calculate entropy
    char_set_size = 0
    if has_lower: char_set_size += 26
    if has_upper: char_set_size += 26
    if has_digit: char_set_size += 10
    if has_special: char_set_size += 32
    entropy = length * (char_set_size ** 0.5)
    
    # Calculate strength score (0-100)
    score = 0
    score += min(length * 4, 40)  # Length (up to 40 points)
    score += 15 if has_lower else 0
    score += 15 if has_upper else 0
    score += 15 if has_digit else 0
    score += 15 if has_special else 0
    
    # Determine strength rating
    if score >= 80:
        strength = 'Very Strong'
        color = '#2ecc71'  # Green
    elif score >= 60:
        strength = 'Strong'
        color = '#27ae60'  # Dark Green
    elif score >= 40:
        strength = 'Moderate'
        color = '#f1c40f'  # Yellow
    elif score >= 20:
        strength = 'Weak'
        color = '#e67e22'  # Orange
    else:
        strength = 'Very Weak'
        color = '#e74c3c'  # Red
    
    # Generate feedback
    feedback = []
    if length < 8:
        feedback.append('Password should be at least 8 characters long')
    if not has_lower:
        feedback.append('Add lowercase letters')
    if not has_upper:
        feedback.append('Add uppercase letters')
    if not has_digit:
        feedback.append('Add numbers')
    if not has_special:
        feedback.append('Add special characters')
    
    return {
        'length': length,
        'score': score,
        'strength': strength,
        'color': color,
        'entropy': round(entropy, 2),
        'character_types': {
            'lowercase': has_lower,
            'uppercase': has_upper,
            'digits': has_digit,
            'special': has_special
        },
        'feedback': feedback
    }

def generate_hash(password: str, algorithm: str = 'bcrypt') -> Dict[str, str]:
    """Generate a hash for the given password using the specified algorithm"""
    if not password:
        return {'error': 'Password is required'}, 400
    
    try:
        if algorithm == 'bcrypt':
            salt = bcrypt.gensalt()
            hash_value = bcrypt.hashpw(password.encode(), salt).decode()
        else:
            hash_obj = hashlib.new(algorithm)
            hash_obj.update(password.encode())
            hash_value = hash_obj.hexdigest()
        
        return {
            'algorithm': algorithm,
            'hash': hash_value
        }
    except ValueError as e:
        return {'error': f'Invalid algorithm: {str(e)}'}, 400
    except Exception as e:
        app.logger.error(f'Error generating hash: {str(e)}')
        return {'error': 'Internal server error'}, 500

def crack_hash(hash_value: str, algorithm: str = 'md5') -> Dict[str, Any]:
    """Attempt to crack a hash (demo mode only)"""
    if not hash_value:
        return {'error': 'Hash is required'}, 400
    
    # In demo mode, only check against known hashes
    if hash_value in DEMO_HASHES:
        return {
            'found': True,
            'password': DEMO_HASHES[hash_value],
            'algorithm': algorithm
        }
    
    return {
        'found': False,
        'message': 'Hash not found in demo database',
        'algorithm': algorithm
    }

@app.route('/')
def index():
    """Serve the main page"""
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """API endpoint for password analysis"""
    try:
        data = request.get_json()
        if not data or 'password' not in data:
            return jsonify({'error': 'Password is required'}), 400
        
        result = analyze_password(data['password'])
        return jsonify(result)
    except Exception as e:
        app.logger.error(f'Error in analyze endpoint: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/hash', methods=['POST'])
def hash_password():
    """API endpoint for password hashing"""
    try:
        data = request.get_json()
        if not data or 'password' not in data:
            return jsonify({'error': 'Password is required'}), 400
        
        algorithm = data.get('algorithm', 'bcrypt')
        result = generate_hash(data['password'], algorithm)
        return jsonify(result)
    except Exception as e:
        app.logger.error(f'Error in hash endpoint: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/crack', methods=['POST'])
def crack():
    """API endpoint for hash cracking (demo mode)"""
    try:
        data = request.get_json()
        if not data or 'hash' not in data:
            return jsonify({'error': 'Hash is required'}), 400
        
        algorithm = data.get('algorithm', 'md5')
        result = crack_hash(data['hash'], algorithm)
        return jsonify(result)
    except Exception as e:
        app.logger.error(f'Error in crack endpoint: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('static', filename)

if __name__ == '__main__':
    # Generate a secure secret key
    app.secret_key = os.urandom(32)
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=False,  # Disable debug mode in production
        ssl_context='adhoc'  # Enable HTTPS
    ) 