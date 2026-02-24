# DeClaw NFT Collection

**1,000 claw-machine robot PFPs** with an MPL-404 hybrid bridge on Solana mainnet.

## Overview

DeClaw is a generative NFT collection featuring unique claw-machine robot characters. Each NFT is composed of 8 layered traits, programmatically generated and composited into 1,000 unique PFP images.

The collection uses Metaplex Core (MPL-404) with a hybrid escrow bridge, allowing bidirectional swaps between NFTs and the CLAW token at a rate of **1M CLAW = 1 NFT**.

- **CLAW Token**: `b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW` (6 decimals)
- **Supply**: 1,000 NFTs
- **Royalties**: 5%

## Trait System

| Category   | Variants | Examples                                      |
|------------|----------|-----------------------------------------------|
| Background | 10       | Midnight Blue, Neon Pink, Void Black          |
| Body       | 8        | Chrome, Matte Black, Gold Plated, Diamond     |
| Chassis    | 7        | Standard Box, Hexagonal, Spiked, Skeletal     |
| Claw       | 10       | Classic Tri-Claw, Laser Grip, Phantom         |
| Visor      | 8        | LED Strip, Mono Eye, Holo Display             |
| Accessory  | 8        | Crown, Headphones, Halo, Mohawk               |
| Aura       | 7        | Electric Sparks, Fire Ring, Rainbow, Glitch   |
| Expression | 7        | Neutral, Happy, Angry, Menacing               |

**Total possible combinations**: ~22 million (65 trait variants across 8 categories)

## Build Progress

- [x] Phase 1: Project setup with dependencies and structure
- [x] Phase 2: Trait system and programmatic art layers (65 layer PNGs)
- [x] Phase 3: Compose 1,000 unique images (seeded PRNG, deduplicated)
- [x] Phase 4: Upload images to Pinata IPFS (folder upload, CID saved)
- [ ] Phase 5: Generate & upload metadata
- [ ] Phase 6: Create Core collection on mainnet
- [ ] Phase 7: Batch mint 1,000 NFTs
- [ ] Phase 8: MPL-404 escrow init and fund
- [ ] Phase 9: Verification and documentation

## Scripts

```bash
npm run create-layers       # Generate 65 trait layer PNGs
npm run generate-art        # Compose 1,000 unique images
npm run upload-images       # Upload images to Pinata IPFS
npm run generate-metadata   # Generate Metaplex-standard JSON
npm run upload-metadata     # Upload metadata to Pinata IPFS
npm run create-collection   # Create Core collection on mainnet
npm run mint-nfts           # Batch mint 1,000 NFTs
npm run init-escrow         # Initialize MPL-404 escrow
npm run fund-escrow         # Transfer NFTs to escrow
npm run verify              # End-to-end verification
```

## Setup

1. Clone and install:
   ```bash
   git clone https://github.com/MidTermDev/Clank-DeClaw.git
   cd Clank-DeClaw
   npm install
   ```

2. Configure `.env`:
   ```
   PINATA_JWT=your_jwt
   PINATA_GATEWAY=your_gateway
   RPC_URL=https://api.mainnet-beta.solana.com
   KEYPAIR_PATH=./keypair.json
   ```

3. Run the pipeline in order (create-layers → generate-art → upload-images → etc.)
