#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Updating Password Cracker...${NC}"

# Stop the application
echo -e "${YELLOW}Stopping the application...${NC}"
./scripts/stop.sh

# Update dependencies
echo -e "${YELLOW}Updating dependencies...${NC}"
if [ -d "venv" ]; then
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
else
    echo -e "${RED}Virtual environment not found. Creating new one...${NC}"
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi

# Update Docker images
echo -e "${YELLOW}Updating Docker images...${NC}"
docker-compose pull

# Run security check
echo -e "${YELLOW}Running security check...${NC}"
./scripts/security_check.sh

# Start the application
echo -e "${YELLOW}Starting the application...${NC}"
if [ -f "docker-compose.yml" ]; then
    ./scripts/start_prod.sh
else
    ./scripts/start.sh
fi

echo -e "\n${GREEN}Application updated successfully!${NC}" 