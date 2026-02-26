#!/bin/bash
# Download all NFT images locally for reliable loading
CID="bafybeidgrbt7retu2vj4lq7e32u5cqrlbtcfugmkkszgt7x42zgkdchux4"
GATEWAY="https://ipfs.io/ipfs"
OUTPUT_DIR="../public/nfts"

mkdir -p $OUTPUT_DIR

for i in $(seq 0 999); do
  if [ ! -f "$OUTPUT_DIR/$i.png" ]; then
    echo "Downloading $i.png..."
    curl -s "$GATEWAY/$CID/$i.png" -o "$OUTPUT_DIR/$i.png"
    sleep 0.1
  fi
done

echo "Done!"
