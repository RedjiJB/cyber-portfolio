# Password Cracker with Wordlists

A secure, educational tool for password analysis and hash cracking simulation. This project is designed for educational purposes and authorized security testing only.

## ⚠️ Legal and Ethical Usage

This tool is provided for educational purposes and authorized security testing only. Users must:

- Only test passwords they own or have explicit written permission to analyze
- Not use the tool for any malicious purposes
- Comply with all applicable laws and regulations
- Understand that unauthorized password cracking is illegal and unethical

The authors of this tool are not responsible for any misuse or damage caused by this tool.

## 🔒 Security Features

- Rate limiting to prevent abuse
- IP blacklisting capability
- XSS and SQL injection protection
- Secure headers configuration
- Input validation and sanitization
- HTTPS support
- Secure session handling
- Comprehensive error handling
- Logging and monitoring
- Content Security Policy (CSP)
- Password strength analysis
- Hash algorithm security recommendations

## 🚀 Features

- Password strength analysis
- Hash generation with multiple algorithms
- Hash cracking simulation (demo mode)
- Modern, responsive web interface
- Real-time feedback and recommendations
- Educational content about password security

## 🛠️ Technical Requirements

- Python 3.8+
- Flask 3.0.2+
- bcrypt 4.0.1+
- Other dependencies listed in `requirements.txt`

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/password-cracker.git
cd password-cracker
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure the application:
- Copy `config.json.example` to `config.json`
- Update the configuration settings as needed
- Generate a secure secret key:
```python
import os
print(os.urandom(32).hex())
```
- Add the generated key to `config.json`

5. Set up SSL certificates (required for production):
```bash
# Using Let's Encrypt (recommended)
sudo certbot certonly --standalone -d yourdomain.com

# Or generate self-signed certificates (development only)
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
python web/app.py
```

### Production Mode
```bash
# Using Gunicorn (recommended)
gunicorn --certfile=cert.pem --keyfile=key.pem -b 0.0.0.0:5000 web.app:app

# Using uWSGI
uwsgi --https 0.0.0.0:5000,cert.pem,key.pem --module web.app:app
```

## 🔧 Configuration

The application can be configured through `config.json`:

- `app`: Application settings
- `security`: Security-related settings
- `logging`: Logging configuration
- `demo`: Demo mode settings
- `headers`: Security headers configuration

## 📝 API Endpoints

### Password Analysis
```http
POST /api/analyze
Content-Type: application/json

{
    "password": "your_password"
}
```

### Hash Generation
```http
POST /api/hash
Content-Type: application/json

{
    "password": "your_password",
    "algorithm": "bcrypt"
}
```

### Hash Cracking (Demo)
```http
POST /api/crack
Content-Type: application/json

{
    "hash": "hash_to_crack",
    "algorithm": "md5"
}
```

## 🔍 Security Best Practices

1. **Password Storage**
   - Use bcrypt or Argon2 for password hashing
   - Never store plain text passwords
   - Use appropriate salt rounds

2. **Input Validation**
   - Validate all user input
   - Sanitize data before processing
   - Use parameterized queries

3. **Session Security**
   - Use secure session cookies
   - Implement session timeout
   - Rotate session IDs

4. **Error Handling**
   - Don't expose sensitive information
   - Log errors securely
   - Use custom error pages

5. **Access Control**
   - Implement rate limiting
   - Use IP blacklisting when needed
   - Monitor for suspicious activity

## 📊 Monitoring and Logging

- Application logs are stored in `logs/app.log`
- Rotating file handler prevents disk space issues
- Log levels can be configured in `config.json`

## 🧪 Testing

Run the test suite:
```bash
python -m pytest tests/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Flask framework
- bcrypt library
- Security headers configuration
- Password strength analysis algorithms

## 📞 Support

For support, please open an issue in the GitHub repository.

## 🔄 Updates

Check the [CHANGELOG.md](CHANGELOG.md) for version history and updates. 