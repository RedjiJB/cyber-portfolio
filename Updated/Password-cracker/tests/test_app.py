import pytest
from web.app import app, analyze_password, generate_hash, crack_hash
import json
import hashlib
import bcrypt

@pytest.fixture
def client():
    """Create a test client for the Flask application"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_index_page(client):
    """Test the main page loads correctly"""
    response = client.get('/')
    assert response.status_code == 200
    assert b'Password Cracker' in response.data

def test_analyze_password_valid():
    """Test password analysis with valid input"""
    result = analyze_password('Test123!@#')
    assert result['score'] > 0
    assert 'strength' in result
    assert 'entropy' in result
    assert 'character_types' in result
    assert 'feedback' in result

def test_analyze_password_empty():
    """Test password analysis with empty input"""
    result, status_code = analyze_password('')
    assert status_code == 400
    assert 'error' in result

def test_analyze_password_short():
    """Test password analysis with short password"""
    result = analyze_password('short')
    assert result['score'] < 40
    assert 'Password should be at least 8 characters long' in result['feedback']

def test_generate_hash_bcrypt():
    """Test hash generation with bcrypt"""
    result = generate_hash('Test123!@#', 'bcrypt')
    assert 'hash' in result
    assert result['algorithm'] == 'bcrypt'
    assert result['hash'].startswith('$2b$')

def test_generate_hash_sha256():
    """Test hash generation with SHA-256"""
    result = generate_hash('Test123!@#', 'sha256')
    assert 'hash' in result
    assert result['algorithm'] == 'sha256'
    assert len(result['hash']) == 64

def test_generate_hash_invalid_algorithm():
    """Test hash generation with invalid algorithm"""
    result, status_code = generate_hash('Test123!@#', 'invalid')
    assert status_code == 400
    assert 'error' in result

def test_crack_hash_demo():
    """Test hash cracking in demo mode"""
    # Test with known hash
    result = crack_hash('5f4dcc3b5aa765d61d8327deb882cf99', 'md5')
    assert result['found'] is True
    assert result['password'] == 'password'
    
    # Test with unknown hash
    result = crack_hash('unknown_hash', 'md5')
    assert result['found'] is False
    assert 'message' in result

def test_api_analyze_endpoint(client):
    """Test the analyze API endpoint"""
    # Test valid password
    response = client.post('/api/analyze',
                          json={'password': 'Test123!@#'},
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'score' in data
    assert 'strength' in data
    
    # Test empty password
    response = client.post('/api/analyze',
                          json={'password': ''},
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data
    
    # Test missing password
    response = client.post('/api/analyze',
                          json={},
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data

def test_api_hash_endpoint(client):
    """Test the hash API endpoint"""
    # Test bcrypt
    response = client.post('/api/hash',
                          json={'password': 'Test123!@#', 'algorithm': 'bcrypt'},
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'hash' in data
    assert data['algorithm'] == 'bcrypt'
    
    # Test SHA-256
    response = client.post('/api/hash',
                          json={'password': 'Test123!@#', 'algorithm': 'sha256'},
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'hash' in data
    assert data['algorithm'] == 'sha256'
    
    # Test invalid algorithm
    response = client.post('/api/hash',
                          json={'password': 'Test123!@#', 'algorithm': 'invalid'},
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data

def test_api_crack_endpoint(client):
    """Test the crack API endpoint"""
    # Test known hash
    response = client.post('/api/crack',
                          json={'hash': '5f4dcc3b5aa765d61d8327deb882cf99', 'algorithm': 'md5'},
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['found'] is True
    assert data['password'] == 'password'
    
    # Test unknown hash
    response = client.post('/api/crack',
                          json={'hash': 'unknown_hash', 'algorithm': 'md5'},
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['found'] is False
    
    # Test invalid input
    response = client.post('/api/crack',
                          json={},
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data

def test_security_headers(client):
    """Test security headers are present"""
    response = client.get('/')
    headers = response.headers
    
    assert 'Content-Security-Policy' in headers
    assert 'X-Content-Type-Options' in headers
    assert 'X-Frame-Options' in headers
    assert 'X-XSS-Protection' in headers
    assert 'Strict-Transport-Security' in headers
    assert 'Referrer-Policy' in headers
    assert 'Permissions-Policy' in headers

def test_rate_limiting(client):
    """Test rate limiting functionality"""
    # Make multiple requests in quick succession
    for _ in range(101):  # Exceed the rate limit
        client.get('/')
    
    # The next request should be rate limited
    response = client.get('/')
    assert response.status_code == 429
    data = json.loads(response.data)
    assert 'error' in data
    assert 'rate limit' in data['message'].lower()

def test_xss_protection(client):
    """Test XSS protection"""
    # Test with XSS attempt in password
    response = client.post('/api/analyze',
                          json={'password': '<script>alert("xss")</script>'},
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data

def test_sql_injection_protection(client):
    """Test SQL injection protection"""
    # Test with SQL injection attempt
    response = client.post('/api/analyze',
                          json={'password': "' OR '1'='1"},
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data

def test_static_files(client):
    """Test static file serving"""
    response = client.get('/static/css/style.css')
    assert response.status_code == 200
    assert 'text/css' in response.headers['Content-Type']

def test_error_handling(client):
    """Test error handling"""
    # Test 404
    response = client.get('/nonexistent')
    assert response.status_code == 404
    data = json.loads(response.data)
    assert 'error' in data
    
    # Test 405 (Method Not Allowed)
    response = client.post('/')
    assert response.status_code == 405
    data = json.loads(response.data)
    assert 'error' in data

def test_password_strength_criteria():
    """Test password strength criteria"""
    # Test very weak password
    result = analyze_password('password')
    assert result['score'] < 20
    assert result['strength'] == 'Very Weak'
    
    # Test strong password
    result = analyze_password('P@ssw0rd123!')
    assert result['score'] >= 60
    assert result['strength'] in ['Strong', 'Very Strong']
    
    # Test password with all character types
    result = analyze_password('P@ssw0rd123!')
    assert result['character_types']['lowercase'] is True
    assert result['character_types']['uppercase'] is True
    assert result['character_types']['digits'] is True
    assert result['character_types']['special'] is True

def test_hash_verification():
    """Test hash verification"""
    password = 'Test123!@#'
    
    # Test bcrypt
    result = generate_hash(password, 'bcrypt')
    assert bcrypt.checkpw(password.encode(), result['hash'].encode())
    
    # Test SHA-256
    result = generate_hash(password, 'sha256')
    expected_hash = hashlib.sha256(password.encode()).hexdigest()
    assert result['hash'] == expected_hash 