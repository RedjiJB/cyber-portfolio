#!/bin/bash

# Create SSL directory if it doesn't exist
mkdir -p nginx/ssl

# Generate private key
openssl genrsa -out nginx/ssl/key.pem 4096

# Generate CSR
openssl req -new -key nginx/ssl/key.pem -out nginx/ssl/csr.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Generate self-signed certificate
openssl x509 -req -days 365 -in nginx/ssl/csr.pem -signkey nginx/ssl/key.pem -out nginx/ssl/cert.pem

# Set proper permissions
chmod 600 nginx/ssl/key.pem
chmod 644 nginx/ssl/cert.pem

# Clean up CSR
rm nginx/ssl/csr.pem

echo "SSL certificates generated successfully in nginx/ssl/"
echo "Note: These are self-signed certificates for development only."
echo "For production, use certificates from a trusted Certificate Authority." 