#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Cleaning up Password Cracker...${NC}"

# Stop the application
echo -e "${YELLOW}Stopping the application...${NC}"
./scripts/stop.sh

# Remove virtual environment
if [ -d "venv" ]; then
    echo -e "${YELLOW}Removing virtual environment...${NC}"
    rm -rf venv
fi

# Remove Python cache files
echo -e "${YELLOW}Removing Python cache files...${NC}"
find . -type d -name "__pycache__" -exec rm -r {} +
find . -type f -name "*.pyc" -delete
find . -type f -name "*.pyo" -delete
find . -type f -name "*.pyd" -delete

# Remove test cache
if [ -d ".pytest_cache" ]; then
    echo -e "${YELLOW}Removing test cache...${NC}"
    rm -rf .pytest_cache
fi

# Remove coverage files
if [ -d "htmlcov" ]; then
    echo -e "${YELLOW}Removing coverage files...${NC}"
    rm -rf htmlcov
fi
if [ -f ".coverage" ]; then
    rm .coverage
fi

# Remove Docker containers and images
if command -v docker &> /dev/null; then
    echo -e "${YELLOW}Removing Docker containers and images...${NC}"
    docker-compose down --rmi all --volumes --remove-orphans
fi

# Remove logs
echo -e "${YELLOW}Removing logs...${NC}"
if [ -d "logs" ]; then
    rm -rf logs/*
fi

# Remove temporary files
echo -e "${YELLOW}Removing temporary files...${NC}"
find . -type f -name "*.log" -delete
find . -type f -name "*.tmp" -delete
find . -type f -name "*.temp" -delete

echo -e "\n${GREEN}Cleanup completed successfully!${NC}" 