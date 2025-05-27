#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "Running security checks..."

# Check SSL certificates
echo -e "\n${YELLOW}Checking SSL certificates...${NC}"
if [ -f "nginx/ssl/cert.pem" ] && [ -f "nginx/ssl/key.pem" ]; then
    echo -e "${GREEN}✓ SSL certificates found${NC}"
    
    # Check certificate expiration
    EXPIRY=$(openssl x509 -enddate -noout -in nginx/ssl/cert.pem | cut -d= -f2)
    echo "Certificate expires: $EXPIRY"
else
    echo -e "${RED}✗ SSL certificates not found${NC}"
    echo "Run ./scripts/generate_ssl.sh to generate certificates"
fi

# Check file permissions
echo -e "\n${YELLOW}Checking file permissions...${NC}"
if [ -f "nginx/ssl/key.pem" ]; then
    PERMS=$(stat -f "%OLp" nginx/ssl/key.pem)
    if [ "$PERMS" = "600" ]; then
        echo -e "${GREEN}✓ Private key has correct permissions (600)${NC}"
    else
        echo -e "${RED}✗ Private key has incorrect permissions ($PERMS)${NC}"
        echo "Run: chmod 600 nginx/ssl/key.pem"
    fi
fi

# Check for sensitive files
echo -e "\n${YELLOW}Checking for sensitive files...${NC}"
SENSITIVE_FILES=(
    ".env"
    "*.pem"
    "*.key"
    "*.crt"
    "*.p12"
    "*.pfx"
    "*.log"
)

for pattern in "${SENSITIVE_FILES[@]}"; do
    FOUND=$(find . -name "$pattern" -not -path "./nginx/ssl/*" -not -path "./.git/*")
    if [ -n "$FOUND" ]; then
        echo -e "${RED}✗ Found sensitive files:${NC}"
        echo "$FOUND"
    fi
done

# Check for debug mode
echo -e "\n${YELLOW}Checking for debug mode...${NC}"
if grep -r "debug=True" --include="*.py" .; then
    echo -e "${RED}✗ Debug mode is enabled${NC}"
else
    echo -e "${GREEN}✓ Debug mode is disabled${NC}"
fi

# Check for hardcoded secrets
echo -e "\n${YELLOW}Checking for hardcoded secrets...${NC}"
SECRET_PATTERNS=(
    "password"
    "secret"
    "key"
    "token"
    "api_key"
    "aws_key"
)

for pattern in "${SECRET_PATTERNS[@]}"; do
    FOUND=$(grep -r --include="*.py" --include="*.json" --include="*.yml" --include="*.yaml" -i "$pattern" . | grep -v "password_cracker" | grep -v "test_" | grep -v "README.md")
    if [ -n "$FOUND" ]; then
        echo -e "${RED}✗ Found potential secrets:${NC}"
        echo "$FOUND"
    fi
done

# Check dependencies
echo -e "\n${YELLOW}Checking dependencies...${NC}"
if [ -f "requirements.txt" ]; then
    echo "Checking for outdated packages..."
    pip list --outdated
else
    echo -e "${RED}✗ requirements.txt not found${NC}"
fi

# Check for security headers
echo -e "\n${YELLOW}Checking security headers...${NC}"
if [ -f "nginx/conf.d/default.conf" ]; then
    if grep -q "add_header X-Frame-Options" nginx/conf.d/default.conf; then
        echo -e "${GREEN}✓ X-Frame-Options header found${NC}"
    else
        echo -e "${RED}✗ X-Frame-Options header missing${NC}"
    fi
    
    if grep -q "add_header X-XSS-Protection" nginx/conf.d/default.conf; then
        echo -e "${GREEN}✓ X-XSS-Protection header found${NC}"
    else
        echo -e "${RED}✗ X-XSS-Protection header missing${NC}"
    fi
    
    if grep -q "add_header Content-Security-Policy" nginx/conf.d/default.conf; then
        echo -e "${GREEN}✓ Content-Security-Policy header found${NC}"
    else
        echo -e "${RED}✗ Content-Security-Policy header missing${NC}"
    fi
else
    echo -e "${RED}✗ Nginx configuration not found${NC}"
fi

echo -e "\n${YELLOW}Security check completed${NC}"
echo "Please review the results and address any issues found." 