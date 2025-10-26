#!/bin/bash
# View Docker container logs

# Follow logs if -f flag is provided
if [ "$1" == "-f" ]; then
    docker-compose logs -f
else
    docker-compose logs --tail=100
fi
