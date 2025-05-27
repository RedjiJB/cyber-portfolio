from functools import wraps
from flask import request, abort, make_response
import re
import time
from typing import Callable, Dict, List, Optional, Union

class SecurityMiddleware:
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)
        
        # Rate limiting configuration
        self.rate_limit_window = 60  # 1 minute window
        self.rate_limit_max_requests = 100  # max requests per window
        self.rate_limit_store: Dict[str, List[float]] = {}
        
        # IP blacklist
        self.ip_blacklist: set = set()
        
        # Request size limit (10MB)
        self.max_request_size = 10 * 1024 * 1024
        
        # Content Security Policy
        self.csp_policy = {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:', 'https:'],
            'font-src': ["'self'", 'https:', 'data:'],
            'connect-src': ["'self'"],
            'frame-ancestors': ["'none'"],
            'form-action': ["'self'"],
            'base-uri': ["'self'"],
            'object-src': ["'none'"],
            'frame-src': ["'none'"],
            'media-src': ["'none'"],
            'worker-src': ["'none'"]
        }
        
        # XSS protection patterns
        self.xss_patterns = [
            r'<script.*?>.*?</script>',
            r'javascript:',
            r'vbscript:',
            r'onload=',
            r'onerror=',
            r'onmouseover=',
            r'eval\(',
            r'expression\(',
            r'url\(',
            r'data:',
            r'base64,'
        ]
        
        # SQL injection patterns
        self.sql_patterns = [
            r'(\%27)|(\')|(\-\-)|(\%23)|(#)',
            r'((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))',
            r'/\*.*?\*/',
            r'(\%20UNION\%20ALL\%20SELECT)',
            r'(\%20OR\%20.*?=.*?)',
            r'(\%20AND\%20.*?=.*?)'
        ]

    def init_app(self, app):
        """Initialize the middleware with the Flask app"""
        app.before_request(self.before_request)
        app.after_request(self.after_request)
        
        # Register error handlers
        app.register_error_handler(400, self.handle_bad_request)
        app.register_error_handler(401, self.handle_unauthorized)
        app.register_error_handler(403, self.handle_forbidden)
        app.register_error_handler(404, self.handle_not_found)
        app.register_error_handler(429, self.handle_too_many_requests)
        app.register_error_handler(500, self.handle_server_error)

    def before_request(self):
        """Handle pre-request security checks"""
        # Check request size
        if request.content_length and request.content_length > self.max_request_size:
            abort(413)  # Request Entity Too Large
        
        # Check IP blacklist
        if request.remote_addr in self.ip_blacklist:
            abort(403)  # Forbidden
        
        # Rate limiting
        if not self._check_rate_limit(request.remote_addr):
            abort(429)  # Too Many Requests
        
        # XSS protection
        if self._check_xss(request):
            abort(400)  # Bad Request
        
        # SQL injection protection
        if self._check_sql_injection(request):
            abort(400)  # Bad Request

    def after_request(self, response):
        """Add security headers to response"""
        # Content Security Policy
        csp = '; '.join([f"{k} {' '.join(v)}" for k, v in self.csp_policy.items()])
        response.headers['Content-Security-Policy'] = csp
        
        # Other security headers
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
        
        return response

    def _check_rate_limit(self, ip: str) -> bool:
        """Check if the IP has exceeded the rate limit"""
        current_time = time.time()
        
        # Clean old requests
        if ip in self.rate_limit_store:
            self.rate_limit_store[ip] = [
                t for t in self.rate_limit_store[ip]
                if current_time - t < self.rate_limit_window
            ]
        else:
            self.rate_limit_store[ip] = []
        
        # Check rate limit
        if len(self.rate_limit_store[ip]) >= self.rate_limit_max_requests:
            return False
        
        # Add current request
        self.rate_limit_store[ip].append(current_time)
        return True

    def _check_xss(self, request) -> bool:
        """Check for XSS attacks in request data"""
        def check_value(value: str) -> bool:
            if not isinstance(value, str):
                return False
            return any(re.search(pattern, value, re.IGNORECASE) for pattern in self.xss_patterns)
        
        # Check query parameters
        if any(check_value(str(v)) for v in request.args.values()):
            return True
        
        # Check form data
        if any(check_value(str(v)) for v in request.form.values()):
            return True
        
        # Check JSON data
        if request.is_json:
            try:
                json_data = request.get_json()
                if isinstance(json_data, dict):
                    return any(check_value(str(v)) for v in json_data.values())
            except:
                pass
        
        return False

    def _check_sql_injection(self, request) -> bool:
        """Check for SQL injection attempts in request data"""
        def check_value(value: str) -> bool:
            if not isinstance(value, str):
                return False
            return any(re.search(pattern, value, re.IGNORECASE) for pattern in self.sql_patterns)
        
        # Check query parameters
        if any(check_value(str(v)) for v in request.args.values()):
            return True
        
        # Check form data
        if any(check_value(str(v)) for v in request.form.values()):
            return True
        
        # Check JSON data
        if request.is_json:
            try:
                json_data = request.get_json()
                if isinstance(json_data, dict):
                    return any(check_value(str(v)) for v in json_data.values())
            except:
                pass
        
        return False

    def handle_bad_request(self, error):
        """Handle 400 Bad Request errors"""
        return make_response({
            'error': 'Bad Request',
            'message': 'The request contains invalid data'
        }, 400)

    def handle_unauthorized(self, error):
        """Handle 401 Unauthorized errors"""
        return make_response({
            'error': 'Unauthorized',
            'message': 'Authentication is required'
        }, 401)

    def handle_forbidden(self, error):
        """Handle 403 Forbidden errors"""
        return make_response({
            'error': 'Forbidden',
            'message': 'Access to this resource is forbidden'
        }, 403)

    def handle_not_found(self, error):
        """Handle 404 Not Found errors"""
        return make_response({
            'error': 'Not Found',
            'message': 'The requested resource was not found'
        }, 404)

    def handle_too_many_requests(self, error):
        """Handle 429 Too Many Requests errors"""
        return make_response({
            'error': 'Too Many Requests',
            'message': 'Rate limit exceeded'
        }, 429)

    def handle_server_error(self, error):
        """Handle 500 Internal Server Error"""
        return make_response({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred'
        }, 500)

    def blacklist_ip(self, ip: str):
        """Add an IP to the blacklist"""
        self.ip_blacklist.add(ip)

    def remove_from_blacklist(self, ip: str):
        """Remove an IP from the blacklist"""
        self.ip_blacklist.discard(ip)

    def update_csp_policy(self, policy_updates: Dict[str, List[str]]):
        """Update the Content Security Policy"""
        for key, values in policy_updates.items():
            if key in self.csp_policy:
                self.csp_policy[key].extend(values)
            else:
                self.csp_policy[key] = values 