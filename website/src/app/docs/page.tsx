"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SOCIAL_LINKS } from "@/lib/constants";

interface DocSection {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

const sections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    icon: "🤖",
    content: (
      <div className="space-y-4">
        <p>
          <strong>DeClaw</strong> is a collection of 1,000 unique claw-machine robot NFTs on Solana.
          Each robot is programmatically generated with 8 trait categories and 65 possible variants.
        </p>
        <p>
          What makes DeClaw special is the <strong>MPL-404 hybrid system</strong> — you can freely 
          swap between holding the NFT or holding fungible CLAW tokens. It&apos;s like a digital claw 
          machine where you can capture robots or release them back.
        </p>
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
          <p className="text-emerald-800 font-medium">🎯 Key Stats</p>
          <ul className="mt-2 text-emerald-700 text-sm space-y-1">
            <li>• 1,000 unique robots</li>
            <li>• 8 trait categories, 65 variants</li>
            <li>• 1,000,000 CLAW = 1 NFT swap</li>
            <li>• 5% royalties</li>
            <li>• 100% open source</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "mpl404",
    title: "MPL-404 Explained",
    icon: "🔄",
    content: (
      <div className="space-y-4">
        <p>
          <strong>MPL-404</strong> is a Metaplex protocol that creates a bridge between NFTs and 
          fungible tokens. Think of it as a two-way portal.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <p className="font-bold text-blue-900">🎰 Capture (Buy)</p>
            <p className="mt-2 text-sm text-blue-800">
              Send 1,000,000 CLAW tokens to the escrow and receive a <strong>random</strong> NFT 
              from the collection. You never know which robot you&apos;ll get!
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-4">
            <p className="font-bold text-purple-900">🔓 Release (Sell)</p>
            <p className="mt-2 text-sm text-purple-800">
              Send any DeClaw NFT back to the escrow and receive exactly 1,000,000 CLAW tokens. 
              Guaranteed liquidity, no marketplace needed.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          This creates a natural price floor — every NFT can always be exchanged for CLAW tokens, 
          and CLAW can always be exchanged for an NFT.
        </p>
      </div>
    ),
  },
  {
    id: "tokens",
    title: "CLAW Token",
    icon: "🪙",
    content: (
      <div className="space-y-4">
        <p>
          <strong>CLAW</strong> is the SPL fungible token that powers the DeClaw ecosystem.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2 text-gray-500">Token Name</td>
                <td className="py-2 font-medium">CLAW</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Decimals</td>
                <td className="py-2 font-medium">6</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Swap Rate</td>
                <td className="py-2 font-medium">1,000,000 CLAW = 1 NFT</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Total Supply</td>
                <td className="py-2 font-medium">1,000,000,000 (1B)</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Mint Address</td>
                <td className="py-2 font-mono text-xs break-all">b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW</td>
              </tr>
            </tbody>
          </table>
        </div>
        <a
          href="https://solscan.io/token/b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
        >
          View on Solscan ↗
        </a>
      </div>
    ),
  },
  {
    id: "escrow",
    title: "Escrow System",
    icon: "🏦",
    content: (
      <div className="space-y-4">
        <p>
          The <strong>escrow</strong> is a smart contract that holds all NFTs available for capture. 
          When you release an NFT, it goes into the escrow. When you capture, it comes out.
        </p>
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-2">Escrow Address</p>
          <code className="text-xs font-mono break-all text-gray-800">
            HDKAQxFVSq9HofTmRt5fRZKMjUEUHtKYXcqgurte3UEq
          </code>
        </div>
        <p className="text-sm text-gray-600">
          Initially, all 1,000 NFTs were deposited into the escrow, funded with CLAW tokens to 
          enable captures. The escrow is permissionless — anyone can interact with it.
        </p>
        <a
          href="https://solscan.io/account/HDKAQxFVSq9HofTmRt5fRZKMjUEUHtKYXcqgurte3UEq"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
        >
          View Escrow on Solscan ↗
        </a>
      </div>
    ),
  },
  {
    id: "traits",
    title: "Traits & Rarity",
    icon: "✨",
    content: (
      <div className="space-y-4">
        <p>
          Each DeClaw robot has <strong>8 traits</strong> that determine its appearance and rarity:
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Background", count: 10 },
            { name: "Body", count: 8 },
            { name: "Chassis", count: 8 },
            { name: "Claw", count: 8 },
            { name: "Visor", count: 10 },
            { name: "Accessory", count: 8 },
            { name: "Aura", count: 5 },
            { name: "Expression", count: 8 },
          ].map((trait) => (
            <div key={trait.name} className="rounded-lg bg-gray-50 p-3 border border-gray-100">
              <p className="font-medium text-gray-900">{trait.name}</p>
              <p className="text-sm text-gray-500">{trait.count} variants</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Rarity is calculated based on how common each trait combination is. Some traits like 
          &quot;Holographic&quot; aura or &quot;Diamond&quot; chassis are much rarer than others.
        </p>
        <Link
          href="/rarity"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
        >
          Explore Rarity Rankings →
        </Link>
      </div>
    ),
  },
  {
    id: "art",
    title: "Generative Art",
    icon: "🎨",
    content: (
      <div className="space-y-4">
        <p>
          All 1,000 DeClaw robots were generated programmatically using a custom pipeline:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li><strong>Layer Generation</strong> — Create base art layers for each trait</li>
          <li><strong>Trait Assignment</strong> — PRNG with seed 42069 assigns traits to each ID</li>
          <li><strong>Image Composition</strong> — 8 layers composited with @napi-rs/canvas</li>
          <li><strong>IPFS Upload</strong> — Images and metadata stored on IPFS</li>
          <li><strong>Minting</strong> — Metaplex Core NFTs minted to escrow</li>
        </ol>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-amber-800 text-sm">
            <strong>🎲 Deterministic:</strong> The same seed always produces the same collection. 
            Anyone can verify the generation was fair by running the code.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "howto",
    title: "How to Swap",
    icon: "📖",
    content: (
      <div className="space-y-4">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900">To Capture (Get an NFT)</h4>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Connect your Solana wallet</li>
              <li>Make sure you have at least 1,000,000 CLAW tokens</li>
              <li>Go to the <Link href="/" className="text-emerald-600 hover:underline">Swap page</Link></li>
              <li>Click &quot;Capture&quot; and approve the transaction</li>
              <li>Receive a random DeClaw NFT!</li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">To Release (Get CLAW)</h4>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Connect your Solana wallet</li>
              <li>Go to the <Link href="/" className="text-emerald-600 hover:underline">Swap page</Link></li>
              <li>Select &quot;Release&quot; tab</li>
              <li>Choose which DeClaw NFT to release</li>
              <li>Approve the transaction and receive 1,000,000 CLAW</li>
            </ol>
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <p className="text-blue-800 text-sm">
            <strong>💡 Tip:</strong> Captures are random! If you want a specific robot, 
            check <a href="https://magiceden.io" target="_blank" rel="noopener noreferrer" className="underline">Magic Eden</a> or 
            capture multiple times and release the ones you don&apos;t want.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "opensource",
    title: "Open Source",
    icon: "💻",
    content: (
      <div className="space-y-4">
        <p>
          DeClaw is <strong>100% open source</strong>. Every line of code is public — from art 
          generation to minting to this website.
        </p>
        <div className="rounded-lg bg-gray-900 text-gray-100 p-4 font-mono text-sm">
          <p className="text-gray-400"># Clone the repo</p>
          <p>git clone https://github.com/MidTermDev/Clank-DeClaw.git</p>
          <p className="mt-2 text-gray-400"># Run the website locally</p>
          <p>cd website && npm install && npm run dev</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View on GitHub
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            𝕏 Follow @ClankDeClaw
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "faq",
    title: "FAQ",
    icon: "❓",
    content: (
      <div className="space-y-4">
        {[
          {
            q: "What wallet do I need?",
            a: "Any Solana wallet works — Phantom, Solflare, Backpack, etc.",
          },
          {
            q: "Where can I buy CLAW tokens?",
            a: "CLAW can be obtained by releasing a DeClaw NFT, or traded on DEXs like Jupiter or Raydium.",
          },
          {
            q: "Is capture truly random?",
            a: "Yes! The escrow selects a random NFT from its holdings. You can verify this on-chain.",
          },
          {
            q: "What are the fees?",
            a: "Standard Solana transaction fees (~0.00001 SOL) plus 5% royalties on NFT swaps.",
          },
          {
            q: "Can I trade DeClaws on marketplaces?",
            a: "Yes! DeClaws are standard Metaplex Core NFTs and can be traded on Magic Eden, Tensor, etc.",
          },
          {
            q: "Who built this?",
            a: "DeClaw was built by Open Claw Dev, with Clank DeClaw as the project's AI-powered voice.",
          },
        ].map((item, i) => (
          <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
            <p className="font-medium text-gray-900">{item.q}</p>
            <p className="mt-1 text-sm text-gray-600">{item.a}</p>
          </div>
        ))}
      </div>
    ),
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Documentation</h1>
          <p className="mt-2 text-gray-500">Everything you need to know about DeClaw</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {sections.map((section) => (
              <div
                key={section.id}
                className={activeSection === section.id ? "block" : "hidden"}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="prose prose-gray max-w-none">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/" className="rounded-lg bg-white/10 p-4 hover:bg-white/20 transition-colors">
              <p className="font-medium">🎰 Swap</p>
              <p className="text-sm text-gray-300">Capture or release</p>
            </Link>
            <Link href="/browse" className="rounded-lg bg-white/10 p-4 hover:bg-white/20 transition-colors">
              <p className="font-medium">🖼️ Browse</p>
              <p className="text-sm text-gray-300">View all 1,000</p>
            </Link>
            <Link href="/rarity" className="rounded-lg bg-white/10 p-4 hover:bg-white/20 transition-colors">
              <p className="font-medium">✨ Rarity</p>
              <p className="text-sm text-gray-300">Check rankings</p>
            </Link>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 p-4 hover:bg-white/20 transition-colors">
              <p className="font-medium">💻 GitHub</p>
              <p className="text-sm text-gray-300">View source code</p>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
