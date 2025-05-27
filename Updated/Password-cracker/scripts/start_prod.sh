#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting Password Cracker in production mode...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Check if SSL certificates exist
if [ ! -f "nginx/ssl/cert.pem" ] || [ ! -f "nginx/ssl/key.pem" ]; then
    echo -e "${RED}SSL certificates not found. Please generate them first.${NC}"
    echo "Run: ./scripts/generate_ssl.sh"
    exit 1
fi

# Run security check
echo -e "${YELLOW}Running security check...${NC}"
./scripts/security_check.sh

# Build and start containers
echo -e "${YELLOW}Building and starting containers...${NC}"
docker-compose up --build -d

# Check if containers are running
echo -e "${YELLOW}Checking container status...${NC}"
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}All containers are running successfully!${NC}"
else
    echo -e "${RED}Some containers failed to start. Check the logs with:${NC}"
    echo "docker-compose logs"
    exit 1
fi

echo -e "\n${GREEN}Application is now running in production mode!${NC}"
echo -e "Access the application at: https://localhost"
echo -e "To view logs, run: docker-compose logs -f"
echo -e "To stop the application, run: docker-compose down" 