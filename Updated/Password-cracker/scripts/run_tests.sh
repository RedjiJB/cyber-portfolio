#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Running tests...${NC}"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${YELLOW}Activating virtual environment...${NC}"
source venv/bin/activate

# Install test dependencies
echo -e "${YELLOW}Installing test dependencies...${NC}"
pip install -r requirements.txt
pip install pytest pytest-cov pytest-mock

# Run security check
echo -e "${YELLOW}Running security check...${NC}"
./scripts/security_check.sh

# Run tests with coverage
echo -e "${YELLOW}Running tests with coverage...${NC}"
pytest --cov=. --cov-report=term-missing tests/

# Check test results
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}All tests passed successfully!${NC}"
else
    echo -e "\n${RED}Some tests failed. Please check the output above.${NC}"
    exit 1
fi

echo -e "\n${GREEN}Test run completed!${NC}" 