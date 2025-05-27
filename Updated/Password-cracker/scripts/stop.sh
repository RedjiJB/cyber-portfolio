#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Stopping Password Cracker...${NC}"

# Check if running in Docker
if docker-compose ps | grep -q "Up"; then
    echo -e "${YELLOW}Stopping Docker containers...${NC}"
    docker-compose down
    echo -e "${GREEN}Docker containers stopped successfully!${NC}"
else
    # Check if Python process is running
    if pgrep -f "python web/app.py" > /dev/null; then
        echo -e "${YELLOW}Stopping Python process...${NC}"
        pkill -f "python web/app.py"
        echo -e "${GREEN}Python process stopped successfully!${NC}"
    else
        echo -e "${YELLOW}No running instances found.${NC}"
    fi
fi

echo -e "\n${GREEN}Application stopped successfully!${NC}" 