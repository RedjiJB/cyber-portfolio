#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Checking Password Cracker status...${NC}"

# Check if running in Docker
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}Application is running in Docker:${NC}"
    docker-compose ps
else
    # Check if Python process is running
    if pgrep -f "python web/app.py" > /dev/null; then
        echo -e "${GREEN}Application is running in development mode${NC}"
        ps aux | grep "python web/app.py" | grep -v grep
    else
        echo -e "${RED}Application is not running${NC}"
    fi
fi

# Check disk usage
echo -e "\n${YELLOW}Checking disk usage...${NC}"
du -sh .

# Check memory usage
echo -e "\n${YELLOW}Checking memory usage...${NC}"
if command -v docker &> /dev/null; then
    docker stats --no-stream
fi

# Check logs
echo -e "\n${YELLOW}Recent logs:${NC}"
if [ -d "logs" ]; then
    tail -n 10 logs/app.log 2>/dev/null || echo "No log files found"
fi

# Check SSL certificates
echo -e "\n${YELLOW}Checking SSL certificates...${NC}"
if [ -f "nginx/ssl/cert.pem" ] && [ -f "nginx/ssl/key.pem" ]; then
    echo -e "${GREEN}SSL certificates found${NC}"
    openssl x509 -enddate -noout -in nginx/ssl/cert.pem
else
    echo -e "${RED}SSL certificates not found${NC}"
fi

# Check dependencies
echo -e "\n${YELLOW}Checking dependencies...${NC}"
if [ -d "venv" ]; then
    source venv/bin/activate
    pip list --outdated
else
    echo -e "${RED}Virtual environment not found${NC}"
fi

echo -e "\n${GREEN}Status check completed!${NC}" 