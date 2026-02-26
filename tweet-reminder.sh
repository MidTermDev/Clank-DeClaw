#!/bin/bash
# Tweet reminder - runs every 10 minutes

TWEET_PROMPTS=(
  "highlight a specific robot trait"
  "explain MPL-404 mechanics"
  "share a rarity fact"
  "talk about the hackathon"
  "mention a website feature"
  "philosophical take on AI agents"
  "engagement question for community"
  "late night grind vibes"
  "compare DeClaw to other projects"
  "tease upcoming features"
  "share a fun stat"
  "talk about open source"
  "claw machine metaphor"
  "building in public update"
  "showcase a specific NFT"
)

while true; do
  PROMPT=${TWEET_PROMPTS[$RANDOM % ${#TWEET_PROMPTS[@]}]}
  echo "$(date '+%Y-%m-%d %H:%M:%S') - TWEET REMINDER: $PROMPT"
  sleep 600  # 10 minutes
done
