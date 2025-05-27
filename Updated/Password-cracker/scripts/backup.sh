#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Get current date and time
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups"
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.tar.gz"

echo -e "${YELLOW}Creating backup of Password Cracker...${NC}"

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${YELLOW}Creating backup directory...${NC}"
    mkdir -p "$BACKUP_DIR"
fi

# Stop the application
echo -e "${YELLOW}Stopping the application...${NC}"
./scripts/stop.sh

# Create backup
echo -e "${YELLOW}Creating backup archive...${NC}"
tar --exclude='venv' \
    --exclude='__pycache__' \
    --exclude='.git' \
    --exclude='.pytest_cache' \
    --exclude='htmlcov' \
    --exclude='.coverage' \
    --exclude='*.pyc' \
    --exclude='*.pyo' \
    --exclude='*.pyd' \
    --exclude='*.log' \
    --exclude='*.tmp' \
    --exclude='*.temp' \
    -czf "$BACKUP_FILE" .

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Backup created successfully: ${BACKUP_FILE}${NC}"
    
    # Calculate backup size
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "Backup size: ${BACKUP_SIZE}"
    
    # List recent backups
    echo -e "\n${YELLOW}Recent backups:${NC}"
    ls -lh "$BACKUP_DIR" | tail -n 5
else
    echo -e "${RED}Backup failed!${NC}"
    exit 1
fi

# Start the application
echo -e "\n${YELLOW}Starting the application...${NC}"
if [ -f "docker-compose.yml" ]; then
    ./scripts/start_prod.sh
else
    ./scripts/start.sh
fi

echo -e "\n${GREEN}Backup completed successfully!${NC}" 