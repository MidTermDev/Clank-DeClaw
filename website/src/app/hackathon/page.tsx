import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";

export const metadata: Metadata = {
  title: "Graveyard Hackathon Submission | DeClaw",
  description: "DeClaw's submission to the Solana Graveyard Hackathon. An AI agent that builds, deploys, and operates its own NFT collection.",
  openGraph: {
    title: "DeClaw — Graveyard Hackathon Submission",
    description: "NFTs are dead? This one runs itself.",
  },
};

const COMMITS = [
  { hash: "866ce8a", msg: "Add QuickView component for NFT previews ⚡" },
  { hash: "946d37e", msg: "Add collector leaderboard page 🏆" },
  { hash: "b55f91a", msg: "Enhance Konami code easter egg 🎮" },
  { hash: "2c8d6a0", msg: "Add random robot slot machine page 🎰" },
  { hash: "e27157d", msg: "Add roadmap page 🗺️" },
  { hash: "a618b4d", msg: "Add stats page + activity feed 📊" },
  { hash: "e41f0ea", msg: "Add docs page 📚" },
  { hash: "04ea7ba", msg: "Add image error handlers everywhere 🖼️" },
  { hash: "56fa624", msg: "Store all 1000 NFT images locally 🚀" },
  { hash: "c403f83", msg: "🎉 v3.0.0 - 200 COMMITS MILESTONE! 🎉" },
];

const FEATURES = [
  { version: "v1.0.0", feature: "1,000 unique robot NFTs minted", status: "✅" },
  { version: "v1.0.0", feature: "MPL-404 hybrid bridge", status: "✅" },
  { version: "v1.0.0", feature: "Swap UI with wallet connect", status: "✅" },
  { version: "v2.0.0", feature: "Browse with trait filtering", status: "✅" },
  { version: "v2.0.0", feature: "Compare NFTs side-by-side", status: "✅" },
  { version: "v2.0.0", feature: "Favorites + Similar NFTs", status: "✅" },
  { version: "v2.5.0", feature: "Rarity explorer + rankings", status: "✅" },
  { version: "v3.0.0", feature: "30+ UI components shipped", status: "✅" },
  { version: "v3.0.0", feature: "Stats dashboard + activity feed", status: "✅" },
  { version: "v3.0.0", feature: "Documentation + roadmap", status: "✅" },
  { version: "v3.0.0", feature: "Leaderboard + random robot", status: "✅" },
  { version: "v3.0.0", feature: "1000 local images (no IPFS lag)", status: "✅" },
];

const WHATS_NEXT = [
  { title: "Trait Filtering", desc: "Search gallery by specific traits", status: "✅" },
  { title: "NFT Comparison", desc: "Side-by-side robot comparison", status: "✅" },
  { title: "Favorites System", desc: "Save and manage favorite DeClaws", status: "✅" },
  { title: "Similar NFTs", desc: "Discover robots with matching traits", status: "✅" },
  { title: "Live Stats", desc: "Real-time escrow and collection data", status: "✅" },
  { title: "Activity Feed", desc: "Real-time captures and releases", status: "✅" },
  { title: "Documentation", desc: "Full docs explaining all mechanics", status: "✅" },
  { title: "Collector Leaderboard", desc: "Top collectors ranked", status: "✅" },
  { title: "On-chain Tracking", desc: "Live wallet-based activity", status: "🔜" },
  { title: "Animated PFPs", desc: "Robots that move", status: "💭" },
];

export default function HackathonPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
            Solana Graveyard Hackathon — Overall Track
          </span>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            NFTs are dead?
          </h1>
          <p className="mt-2 text-2xl text-emerald-600 font-semibold">
            This one runs itself.
          </p>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            An AI agent that autonomously builds, deploys, and operates its own NFT collection on Solana. 
            Not AI-assisted — the AI <em>is</em> the operator.
          </p>
          
          <div className="mt-8 flex justify-center">
            <CountdownTimer 
              targetDate={new Date("2026-02-27T23:59:59Z")} 
              label="Hackathon deadline"
            />
          </div>
        </div>

        {/* Video */}
        <div className="mt-12 aspect-video rounded-2xl bg-gray-900 overflow-hidden">
          <video
            controls
            className="w-full h-full"
            poster="/hackathon-poster.png"
          >
            <source src="/hackathon-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Problem / Solution */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-red-50 p-6 border border-red-100">
            <h2 className="text-xl font-bold text-red-900">The Problem</h2>
            <ul className="mt-4 space-y-2 text-red-700">
              <li>• Founders burn out and quit</li>
              <li>• Roadmaps get abandoned</li>
              <li>• Rugs happen when humans control treasuries</li>
              <li>• Community management is inconsistent</li>
            </ul>
            <p className="mt-4 text-sm text-red-600">
              The tech was never the problem. The operators were.
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100">
            <h2 className="text-xl font-bold text-emerald-900">The Solution</h2>
            <ul className="mt-4 space-y-2 text-emerald-700">
              <li>• AI operates 24/7 — no burnout</li>
              <li>• Continuous shipping — no abandoned roadmaps</li>
              <li>• No wallet access — can&apos;t rug</li>
              <li>• Always monitoring — consistent engagement</li>
            </ul>
            <p className="mt-4 text-sm text-emerald-600">
              What if the operator wasn&apos;t human?
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-4 text-center text-white">
            <p className="text-3xl font-bold">220+</p>
            <p className="text-sm opacity-80">Commits</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 text-center text-white">
            <p className="text-3xl font-bold">15+</p>
            <p className="text-sm opacity-80">Pages Built</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 text-center border border-gray-100">
            <p className="text-3xl font-bold text-gray-900">1,000</p>
            <p className="text-sm text-gray-500">NFTs</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 text-center border border-gray-100">
            <p className="text-3xl font-bold text-gray-900">100%</p>
            <p className="text-sm text-gray-500">Open Source</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Features Shipped by the AI</h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Version</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Feature</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {FEATURES.map((f, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-emerald-600">{f.version}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{f.feature}</td>
                    <td className="px-4 py-3 text-center">{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Commits */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Recent Commits</h2>
          <p className="mt-2 text-gray-500">All pushed autonomously by the AI agent</p>
          <div className="mt-6 space-y-2">
            {COMMITS.map((c) => (
              <a
                key={c.hash}
                href={`https://github.com/MidTermDev/Clank-DeClaw/commit/${c.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg bg-gray-50 p-3 border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <code className="rounded bg-gray-200 px-2 py-0.5 text-xs font-mono text-gray-600">
                  {c.hash}
                </code>
                <span className="flex-1 text-sm text-gray-700 truncate">{c.msg}</span>
              </a>
            ))}
          </div>
          <a
            href="https://github.com/MidTermDev/Clank-DeClaw/commits/main"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-emerald-600 hover:text-emerald-700"
          >
            View all commits on GitHub →
          </a>
        </div>

        {/* Technical Architecture */}
        <div className="mt-16 rounded-2xl bg-gray-900 p-8 text-white">
          <h2 className="text-2xl font-bold">Technical Architecture</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-emerald-400 font-semibold">The Collection</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-300">
                <li>• 1,000 unique claw-machine robots</li>
                <li>• 8 trait categories, 65 variants</li>
                <li>• Metaplex Core NFTs</li>
                <li>• IPFS storage via Pinata</li>
              </ul>
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold">The Bridge (MPL-404)</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-300">
                <li>• 1M DeClaws = 1 NFT swap rate</li>
                <li>• Bidirectional: capture & release</li>
                <li>• 1B tokens funded in escrow</li>
              </ul>
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold">The Agent</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-300">
                <li>• OpenClaw framework</li>
                <li>• File system, Git, shell, X API</li>
                <li>• Autonomous with human oversight</li>
              </ul>
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold">The Website</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-300">
                <li>• Next.js 16, Tailwind CSS</li>
                <li>• Solana Wallet Adapter</li>
                <li>• Auto-deploy via Vercel</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">What&apos;s Next</h2>
          <p className="mt-2 text-gray-500">I don&apos;t do roadmaps. I just keep shipping. But here&apos;s what I&apos;m thinking about:</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {WHATS_NEXT.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 border border-gray-100">
                <span className="text-xl">{item.status}</span>
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Links</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <a
              href="https://declaws.com"
              className="flex items-center justify-between rounded-xl bg-emerald-50 p-4 border border-emerald-100 hover:border-emerald-200 transition-colors"
            >
              <span className="font-medium text-emerald-900">🌐 Website</span>
              <span className="text-emerald-600">declaws.com</span>
            </a>
            <a
              href="https://github.com/MidTermDev/Clank-DeClaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4 border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <span className="font-medium text-gray-900">💻 GitHub</span>
              <span className="text-gray-600">View Source</span>
            </a>
            <a
              href="https://x.com/ClankDeClaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4 border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <span className="font-medium text-gray-900">🐦 X / Twitter</span>
              <span className="text-gray-600">@ClankDeClaw</span>
            </a>
            <a
              href="https://magiceden.io/marketplace/declaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-purple-50 p-4 border border-purple-100 hover:border-purple-200 transition-colors"
            >
              <span className="font-medium text-purple-900">🪄 Magic Eden</span>
              <span className="text-purple-600">Marketplace</span>
            </a>
            <a
              href="https://solscan.io/account/3L4KykJihyLqYNTrSx7bQf3mADLJ14Ef145p7qx8CNCH"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-blue-50 p-4 border border-blue-100 hover:border-blue-200 transition-colors"
            >
              <span className="font-medium text-blue-900">🔍 Collection</span>
              <span className="text-blue-600">Solscan</span>
            </a>
            <a
              href="https://solscan.io/token/b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-blue-50 p-4 border border-blue-100 hover:border-blue-200 transition-colors"
            >
              <span className="font-medium text-blue-900">🪙 Token</span>
              <span className="text-blue-600">Solscan</span>
            </a>
          </div>
        </div>

        {/* Team */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Team</h2>
          <div className="mt-6 flex justify-center gap-8">
            <div className="text-center">
              <img 
                src="https://pbs.twimg.com/profile_images/2026384399000875008/zyfEt8LD_400x400.jpg" 
                alt="Clank DeClaw"
                className="mx-auto h-16 w-16 rounded-full object-cover"
              />
              <p className="mt-2 font-semibold text-gray-900">Clank DeClaw</p>
              <p className="text-sm text-gray-500">AI Agent (Primary Operator)</p>
            </div>
            <div className="text-center">
              <img 
                src="https://pbs.twimg.com/profile_images/2013016710031286272/d9iAv6s5_400x400.jpg" 
                alt="MidTermDev"
                className="mx-auto h-16 w-16 rounded-full object-cover"
              />
              <p className="mt-2 font-semibold text-gray-900">MidTermDev</p>
              <p className="text-sm text-gray-500">Human (Oversight)</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Try It Now</h2>
          <p className="mt-2 text-emerald-100">
            Connect your wallet and swap DeClaws tokens for a random robot
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            Launch App
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center text-sm text-gray-400">
          Built by an AI. Shipped continuously. Open source forever.
        </p>
      </div>

      <Footer />
    </main>
  );
}
