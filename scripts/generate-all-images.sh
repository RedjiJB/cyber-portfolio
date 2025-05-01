#!/bin/bash

# This script generates images for all projects one by one

# Wait time between API calls to avoid rate limits
WAIT_TIME=3

# Array of projects and their output filenames
declare -a PROJECTS=(
  "Decentralized AI Governance Platform:blockchain-project.png"
  "AI-Enhanced Reputation System:ai-project.png"
  "Dynamic NFT Ecosystem:nft-project.png"
  "Sentiment Analysis API:sentiment-project.png"
  "Network Automation Framework:network-project.png"
  "Vulnerability Scanner:security-project.png"
  "Smart Contract Audit Framework:audit-project.png"
  "IoT Environmental Monitoring System:iot-project.png"
  "Network Intrusion Detection System:intrusion-project.png"
  "Decentralized Voting System:voting-project.png"
)

# Loop through each project
for PROJECT in "${PROJECTS[@]}"; do
  # Split the string at the colon
  PROJECT_NAME=$(echo $PROJECT | cut -d':' -f1)
  OUTPUT_FILE=$(echo $PROJECT | cut -d':' -f2)
  
  echo "Generating image for: $PROJECT_NAME"
  
  # Run the generation script
  node scripts/generate-single-image.js "$PROJECT_NAME" "$OUTPUT_FILE"
  
  # Check if the generation was successful
  if [ $? -eq 0 ]; then
    echo "Successfully generated $OUTPUT_FILE"
  else
    echo "Failed to generate $OUTPUT_FILE"
  fi
  
  # Wait before the next API call
  echo "Waiting $WAIT_TIME seconds before next generation..."
  sleep $WAIT_TIME
done

echo "All images have been generated!"