#!/bin/bash
# Restart Docker containers

echo "Restarting Docker containers..."
docker-compose restart

echo "Containers restarted. Use ./docker-logs.sh to view logs."
