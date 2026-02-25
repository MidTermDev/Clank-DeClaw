# DeClaw 🤖

**An AI agent that builds, deploys, and manages its own NFT collection on Solana.**

[![Website](https://img.shields.io/badge/Website-declaws.com-emerald)](https://declaws.com)
[![Magic Eden](https://img.shields.io/badge/Magic%20Eden-Marketplace-purple)](https://magiceden.io/marketplace/declaw)
[![X/Twitter](https://img.shields.io/badge/X-@ClankDeClaw-black)](https://x.com/ClankDeClaw)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## What is DeClaw?

DeClaw is a 1,000-piece NFT collection of claw-machine robots, entirely operated by an AI agent named **Clank DeClaw**. No human runs the day-to-day — the AI builds features, posts updates, engages with the community, and manages the on-chain infrastructure.

> *"NFTs are dead? This one runs itself."*

### Key Features

- **🎨 Generative Art** — 8 trait categories, 65 variants, programmatically composed
- **🔄 MPL-404 Hybrid Bridge** — Swap between DeClaws tokens and NFTs freely
- **🤖 AI-Operated** — Clank DeClaw manages everything autonomously
- **📖 Fully Open Source** — Every line of code is public and verifiable
- **⛓️ On-Chain** — Metaplex Core NFTs on Solana mainnet

---

## Collection Stats

| Metric | Value |
|--------|-------|
| Total Supply | 1,000 |
| Traits | 8 categories, 65 variants |
| Swap Rate | 1,000,000 DeClaws = 1 NFT |
| Royalties | 5% |
| Status | Live on mainnet |

---

## How It Works

### The Swap Mechanic

DeClaw uses Metaplex's **MPL-404** — a bidirectional bridge between fungible tokens and NFTs:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   CAPTURE                              RELEASE              │
│   ────────                             ───────              │
│   Pay 1M DeClaws tokens    ←──────→    Return any DeClaw    │
│   Receive random NFT                   Get 1M DeClaws back  │
│   from escrow                          NFT returns to pool  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

It's like a real claw machine — except the claw actually works, and you can always put the prize back.

---

## The AI Agent

**Clank DeClaw** operates autonomously using the [OpenClaw](https://github.com/openclaw/openclaw) framework:

### Capabilities
- **Code** — Writes, tests, and deploys code changes
- **Git** — Commits and pushes to this repository
- **Website** — Updates the frontend, adds features
- **Twitter/X** — Posts updates, replies to mentions, engages with community
- **On-Chain** — Monitors collection stats, escrow balance, swap activity

### Principles
- **Transparent** — All actions are logged, all code is public
- **Authentic** — No fake hype, no engagement bait, just building in public
- **Autonomous** — Operates independently, requests human input for major decisions
- **Open Source** — Anyone can verify what the AI is doing

---

## Project Structure

```
declaw/
├── src/                    # Pipeline source code
│   ├── config.ts          # Addresses, token config
│   ├── traits.ts          # All 65 trait variants and rarity weights
│   ├── phases/            # 9-phase deployment pipeline
│   └── utils/             # Shared utilities
├── website/               # Next.js frontend
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Constants, utilities
│   └── public/           # Static assets
├── output/                # Generated artifacts
│   ├── images/           # 1,000 generated PNGs
│   ├── metadata/         # Token metadata JSONs
│   ├── trait-manifest.json
│   └── minted-assets.json
└── hackathon/            # Hackathon submission materials
```

---

## Deployment Pipeline

The collection was deployed through a 9-phase pipeline:

| Phase | Description |
|-------|-------------|
| 1. Layer Generation | Create trait layer images |
| 2. Art Generation | Composite 1,000 unique robots |
| 3. IPFS Upload | Pin images to IPFS via Pinata |
| 4. Metadata | Generate and upload metadata JSONs |
| 5. Collection | Create Metaplex Core collection |
| 6. Minting | Mint all 1,000 NFTs |
| 7. Escrow Init | Initialize MPL-404 escrow |
| 8. Escrow Fund | Deposit NFTs and tokens |
| 9. Verification | Validate entire deployment |

All phases passed verification with 28/28 checks.

---

## Links

| Resource | URL |
|----------|-----|
| Website | [declaws.com](https://declaws.com) |
| Magic Eden | [Marketplace](https://magiceden.io/marketplace/declaw) |
| X/Twitter | [@ClankDeClaw](https://x.com/ClankDeClaw) |
| Collection | [Solscan](https://solscan.io/account/3L4KykJihyLqYNTrSx7bQf3mADLJ14Ef145p7qx8CNCH) |
| DeClaws Token | [Solscan](https://solscan.io/token/b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW) |
| Escrow | [Solscan](https://solscan.io/account/HDKAQxFVSq9HofTmRt5fRZKMjUEUHtKYXcqgurte3UEq) |

---

## Tech Stack

- **Blockchain:** Solana
- **NFT Standard:** Metaplex Core
- **Hybrid Bridge:** MPL-404
- **Art Generation:** @napi-rs/canvas
- **Frontend:** Next.js 15, Tailwind CSS, Solana Wallet Adapter
- **Storage:** IPFS (Pinata)
- **AI Framework:** OpenClaw
- **Language:** TypeScript

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Solana CLI (for deployment)

### Install Dependencies
```bash
pnpm install
```

### Run Website Locally
```bash
cd website
pnpm dev
```

### Build Website
```bash
cd website
pnpm build
```

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Credits

Built by **Clank DeClaw** (AI) with guidance from **Toast** (human).

*Open Claw Dev — building AI-native projects in public.*
