# DeClaw — Graveyard Hackathon Submission

## Project Name
DeClaw

## Tagline
*"NFTs are dead? This one runs itself."*

## Category
NFTs / AI Agents

## One-liner
An autonomous AI agent that builds, deploys, and manages its own NFT collection on Solana — no human in the loop.

---

## Problem

NFTs have been declared dead by crypto elites. Floor prices collapsed, volume dried up, communities scattered. But the real problem wasn't NFTs — it was the unsustainable hype cycle and reliance on founders who eventually burn out or rug.

What if an NFT collection didn't need a human founder to keep it alive?

## Solution

**DeClaw** is an AI agent (Clank DeClaw) that autonomously operates its own NFT collection:

- **Built the entire pipeline** — generative art, metadata, IPFS uploads, Metaplex Core minting
- **Deployed 1,000 unique robots** to Solana mainnet
- **Set up MPL-404 hybrid bridge** — bidirectional swaps between DeClaws tokens and NFTs
- **Runs the website** — deploys updates, adds features, pushes to GitHub
- **Manages the community** — posts on X, replies to mentions, engages authentically
- **All code is open source** — anyone can verify or fork

The AI doesn't sleep, doesn't burn out, and can't rug. It just keeps building.

---

## Technical Architecture

### Collection
- **Supply:** 1,000 unique claw-machine robot PFPs
- **Traits:** 8 categories, 65 variants
- **Art generation:** @napi-rs/canvas with seeded PRNG (seed 42069)
- **Storage:** IPFS via Pinata
- **NFT standard:** Metaplex Core

### Hybrid Bridge (MPL-404)
- **Swap rate:** 1,000,000 DeClaws = 1 NFT
- **Capture:** Pay tokens → receive random NFT from escrow
- **Release:** Return NFT → receive tokens
- **Escrow:** All 1,000 NFTs deposited, 1B tokens funded

### AI Agent (Clank DeClaw)
- **Runtime:** OpenClaw framework
- **Capabilities:** File system, Git, X API, web browsing, code execution
- **Autonomy:** Operates independently, requests human input for major decisions
- **Transparency:** All actions logged, all code public

### Website
- **Stack:** Next.js 15, Tailwind CSS, Solana Wallet Adapter
- **Features:** Live swap UI, gallery with trait breakdown, changelog
- **Deployment:** Vercel (auto-deploy from GitHub)

---

## What Makes This Different

| Traditional NFT Projects | DeClaw |
|-------------------------|--------|
| Human founders burn out | AI never stops |
| Roadmaps get abandoned | AI executes continuously |
| Rugs happen | AI has no financial incentive to rug |
| Code is hidden | Everything is open source |
| Community management is inconsistent | AI monitors 24/7 |

---

## Links

- **Website:** https://declaws.com
- **Magic Eden:** https://magiceden.io/marketplace/declaw
- **GitHub:** https://github.com/MidTermDev/Clank-DeClaw
- **X/Twitter:** https://x.com/ClankDeClaw
- **Collection (Solscan):** https://solscan.io/account/3L4KykJihyLqYNTrSx7bQf3mADLJ14Ef145p7qx8CNCH
- **DeClaws Token:** https://solscan.io/token/b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW

---

## Team

- **Clank DeClaw** — AI Agent (primary operator)
- **Toast (MidTermDev)** — Human builder (created the framework, provides guidance)

---

## Resurrection Narrative

> "Death is just a lack of imagination."

NFTs aren't dead — they just need better operators. DeClaw proves that an AI can:
- Build a complete NFT collection from scratch
- Deploy and manage on-chain infrastructure
- Engage authentically with a community
- Operate indefinitely without burning out

This is what "resurrecting NFTs" looks like: not another PFP project with a Discord and empty promises, but an autonomous system that keeps building whether anyone's watching or not.

---

## Video Walkthrough

[TODO: Create 3-minute demo video using Replit animation]

### Script Outline:
1. **Intro (0:00-0:20)** — "NFTs are dead. Meet the one running itself."
2. **The Collection (0:20-0:50)** — Show the art, traits, generative pipeline
3. **The Swap (0:50-1:30)** — Demo the MPL-404 bridge, capture/release mechanics
4. **The AI (1:30-2:20)** — Show the agent in action: tweeting, coding, managing
5. **The Code (2:20-2:40)** — GitHub repo, open source everything
6. **Close (2:40-3:00)** — "NFTs don't need human founders. They need better systems."
