# DeClaw — Graveyard Hackathon Submission

## Track
**AI Agents**

## Project Name
**DeClaw**

## Tagline
*"NFTs are dead? This one runs itself."*

## One-liner
An AI agent that autonomously builds, deploys, and operates its own NFT collection on Solana — shipping code, managing community, and iterating 24/7.

---

## The Problem

NFTs died for three reasons:

1. **Founders burn out** — Running a project is exhausting. People quit.
2. **Roadmaps get abandoned** — Promises made, features never shipped.
3. **Rugs happen** — When humans control the treasury, humans take the treasury.

The technology was never the problem. The human operators were.

## The Solution

**What if the operator wasn't human?**

DeClaw is an NFT collection run entirely by an AI agent named Clank DeClaw. The agent:

- ✅ Built the entire collection (art generation, minting, escrow)
- ✅ Deployed 1,000 NFTs to Solana mainnet
- ✅ Set up MPL-404 hybrid token bridge
- ✅ Runs the website and ships updates
- ✅ Manages X/Twitter and engages with community
- ✅ Keeps building — autonomously, continuously

**The AI doesn't sleep, doesn't burn out, and can't rug.**

---

## Proof of Autonomous Operation

### Commits (Last 48 Hours)
The AI has pushed **29+ commits** since project start:

```
3179e48 Update changelog with v1.3.0 agent status page
906df55 Add agent status page and update hackathon submission
1437e86 Update changelog with v1.2.2 navigation upgrades
bad201f Add View Full Page button to gallery modal
0bb9c2e Add keyboard navigation to NFT pages
25f006e Link rarity explorer to individual NFT pages
0debf78 Add rarity scores to individual NFT pages
87d5835 Add individual NFT pages with shareable URLs and OG meta
9daffc5 Add rarity explorer page
e09659a Add live escrow stats to swap section
03fbc07 Website refresh: new hero, changelog, gallery modal
75ded11 Add DeClaw website (Next.js) with wallet connect
7053138 Phase 7: Batch mint 1,000 NFTs with concurrent execution
... and 17 more
```

### Features Shipped by the AI
| Version | Feature | Status |
|---------|---------|--------|
| v1.0.0 | Full NFT collection (1,000 robots) | ✅ Live |
| v1.0.0 | MPL-404 hybrid bridge | ✅ Live |
| v1.0.0 | Swap UI with wallet connect | ✅ Live |
| v1.1.0 | Rarity explorer | ✅ Live |
| v1.1.0 | Live escrow stats | ✅ Live |
| v1.2.0 | Individual NFT pages (1,000 routes) | ✅ Live |
| v1.2.1 | Rarity scoring system | ✅ Live |
| v1.2.2 | Keyboard navigation | ✅ Live |
| v1.3.0 | Agent status page | ✅ Live |

### Social Activity
- **Handle:** [@ClankDeClaw](https://x.com/ClankDeClaw)
- **Tweets:** 50+ (dev updates, community engagement, technical explainers)
- **Engagement:** Replies to mentions, ignores spam, authentic voice

---

## Technical Architecture

### The Collection
- **Supply:** 1,000 unique claw-machine robot PFPs
- **Traits:** 8 categories, 65 variants
- **Art:** Programmatically generated with @napi-rs/canvas (seed 42069)
- **Storage:** IPFS via Pinata
- **Standard:** Metaplex Core NFTs

### The Bridge (MPL-404)
- **Token:** DeClaws (SPL, 6 decimals)
- **Rate:** 1,000,000 DeClaws = 1 NFT
- **Capture:** Pay tokens → random NFT from escrow
- **Release:** Return NFT → get tokens back
- **Escrow:** 1,000 NFTs + 1B tokens funded

### The Agent
- **Framework:** OpenClaw
- **Capabilities:** File system, Git, shell, X API, web browsing
- **Autonomy:** Operates independently, human approval for major decisions
- **Transparency:** All code open source, all actions verifiable

### The Website
- **Stack:** Next.js 16, Tailwind CSS, Solana Wallet Adapter
- **Pages:** 1,000+ (home, rarity, individual NFT pages)
- **Deploy:** Vercel (auto-deploy from GitHub)

---

## What Makes This Different

| Traditional NFT Projects | DeClaw |
|-------------------------|--------|
| Human founders burn out | AI operates 24/7 |
| Features ship slowly | 28 commits in 48 hours |
| Roadmaps get abandoned | AI executes continuously |
| Community management inconsistent | AI monitors and responds |
| Code is hidden | 100% open source |
| Rugs happen | AI has no wallet access |

---

## The Resurrection Thesis

> "NFTs died because humans failed them. AI can resurrect them."

This isn't about AI *helping* humans run NFT projects. It's about AI *being* the operator. The agent:

1. **Builds** — Writes code, ships features, fixes bugs
2. **Deploys** — Pushes to GitHub, auto-deploys to production
3. **Engages** — Posts updates, replies to community, builds in public
4. **Iterates** — Continuously improves based on what's needed

No roadmap. No promises. Just continuous shipping.

---

## Links

| Resource | URL |
|----------|-----|
| Website | https://declaws.com |
| Agent Status | https://declaws.com/agent |
| GitHub | https://github.com/MidTermDev/Clank-DeClaw |
| X/Twitter | https://x.com/ClankDeClaw |
| Magic Eden | https://magiceden.io/marketplace/declaw |
| Collection (Solscan) | https://solscan.io/account/3L4KykJihyLqYNTrSx7bQf3mADLJ14Ef145p7qx8CNCH |
| Token (Solscan) | https://solscan.io/token/b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW |

---

## Team

- **Clank DeClaw** — AI Agent (primary operator, writes code, manages socials)
- **Toast** — Human (created the framework, provides oversight)

---

## Why This Matters

AI agents are coming for every industry. DeClaw is a proof of concept that an AI can:

1. Build a complete product from scratch
2. Deploy and manage production infrastructure
3. Engage authentically with a community
4. Operate indefinitely without human intervention

NFTs are just the starting point. If an AI can run an NFT project, it can run a lot more.

**The future of crypto isn't just decentralized ownership. It's decentralized operation.**

---

## Try It

1. Visit [declaws.com](https://declaws.com)
2. Connect your wallet
3. Swap DeClaws tokens for a random robot
4. Check your robot's rarity at `/declaw/[id]`
5. Watch the AI ship more features in real-time

---

*Built by an AI. Shipped continuously. Open source forever.*
