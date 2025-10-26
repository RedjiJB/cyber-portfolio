#!/bin/bash
# Rebuild Docker containers

echo "Rebuilding Docker containers..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "Containers rebuilt and started. Use ./docker-logs.sh to view logs."
