#!/bin/bash

# any future command that fails will exit the script
set -e

#Docker commands
echo "Get the docker container id"
CONTAINERID=$(sudo docker ps --filter publish=5000 -q)
echo "Docker container id: $CONTAINERID"

echo "Remove the Docker container"
sudo docker rm -f $CONTAINERID

echo "Remove the Docker image"
sudo docker image rm -f dfmscloud/dfms-management:dev

echo "Pull the docker image"
sudo docker run -d -p 8080:5000 dfmscloud/dfms-management:dev

echo "Success"
