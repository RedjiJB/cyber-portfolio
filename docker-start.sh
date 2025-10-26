#!/bin/bash
# Start Docker containers

echo "Starting Docker containers..."
docker-compose up -d

echo "Containers started. Use ./docker-logs.sh to view logs."
