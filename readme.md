# DeClaw NFT Collection

**1,000 claw-machine robot PFPs** with an MPL-404 hybrid bridge on Solana mainnet.

## Deployed Addresses

| Account | Address |
|---------|---------|
| Collection | `3L4KykJihyLqYNTrSx7bQf3mADLJ14Ef145p7qx8CNCH` |
| Escrow PDA | `HDKAQxFVSq9HofTmRt5fRZKMjUEUHtKYXcqgurte3UEq` |
| CLAW Token | `b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW` |
| Images (IPFS) | `bafybeidgrbt7retu2vj4lq7e32u5cqrlbtcfugmkkszgt7x42zgkdchux4` |
| Metadata (IPFS) | `bafybeian5z6oxfrz2iv52j2f7fnaiotpi4aocnn3d5uxop7a36y5akj47i` |

## Overview

DeClaw is a generative NFT collection featuring unique claw-machine robot characters. Each NFT is composed of 8 layered traits, programmatically generated and composited into 1,000 unique PFP images.

The collection uses Metaplex Core (MPL-404) with a hybrid escrow bridge, allowing bidirectional swaps between NFTs and the CLAW token at a rate of **1M CLAW = 1 NFT**.

- **CLAW Token**: `b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW` (6 decimals)
- **Supply**: 1,000 NFTs
- **Royalties**: 5%

## Architecture

```
src/
  config.ts            — Shared Umi setup (RPC, keypair, plugins)
  traits.ts            — 8 trait categories with 65 variants + rarity weights
  create-layers.ts     — Programmatic art layer generation (1000x1000 PNGs)
  generate-art.ts      — Compose 1,000 unique images (seeded PRNG, dedup)
  upload-images.ts     — Pinata IPFS image upload
  generate-metadata.ts — Metaplex-standard JSON metadata
  upload-metadata.ts   — Pinata IPFS metadata upload
  create-collection.ts — Create Core collection on mainnet
  mint-nfts.ts         — Concurrent mint (15x parallelism, resume-safe)
  init-escrow.ts       — MPL-404 escrow initialization
  fund-escrow.ts       — Concurrent transfer to escrow PDA (resume-safe)
  verify.ts            — End-to-end verification (28 checks)
```

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
- [x] Phase 4: Upload images to Pinata IPFS
- [x] Phase 5: Generate & upload metadata (Metaplex-standard JSON)
- [x] Phase 6: Create Core collection on mainnet
- [x] Phase 7: Batch mint 1,000 NFTs (15x concurrent, ~14.6 min)
- [x] Phase 8: MPL-404 escrow init and fund (1,000 NFTs deposited, ~14.8 min)
- [x] Phase 9: Verification (28/28 checks passed) and documentation

## Scripts

```bash
npm run create-layers       # Generate 65 trait layer PNGs
npm run generate-art        # Compose 1,000 unique images
npm run upload-images       # Upload images to Pinata IPFS
npm run generate-metadata   # Generate Metaplex-standard JSON
npm run upload-metadata     # Upload metadata to Pinata IPFS
npm run create-collection   # Create Core collection on mainnet
npm run mint-nfts           # Batch mint 1,000 NFTs (resume-safe)
npm run init-escrow         # Initialize MPL-404 escrow
npm run fund-escrow         # Transfer NFTs to escrow (resume-safe)
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
   PINATA_GATEWAY=gateway.pinata.cloud
   RPC_URL=your_rpc_url
   KEYPAIR_PATH=./keypair.json
   ```

3. Fund the wallet keypair with ~3.5-4 SOL for minting.

4. Run the pipeline in order:
   ```bash
   npm run create-layers
   npm run generate-art
   npm run upload-images
   npm run generate-metadata
   npm run upload-metadata
   npm run create-collection
   npm run mint-nfts
   npm run init-escrow
   npm run fund-escrow
   npm run verify
   ```

## MPL-404 Hybrid Bridge

The escrow links the DeClaw collection to the CLAW token:
- **Swap rate**: 1,000,000 CLAW (1M) = 1 NFT
- **Path**: 1 (static NFTs, no metadata rerolling)
- **Fees**: 0 (no token fee, no SOL fee)
- **Bidirectional**: Users can swap CLAW->NFT and NFT->CLAW

All 1,000 NFTs are deposited in the escrow. Any holder of 1M+ CLAW tokens can swap for a random DeClaw NFT, and any DeClaw NFT holder can swap back for 1M CLAW.
