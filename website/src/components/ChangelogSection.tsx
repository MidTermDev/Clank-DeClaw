"use client";

const CHANGELOG = [
  {
    date: "2026-02-25",
    version: "1.9.3",
    title: "Search & Discovery 🔍",
    changes: [
      "Smart search by ID or trait",
      "Rarity distribution chart",
      "Magic Eden button in gallery",
      "Press / to search",
      "Collection stats visualization",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.9.2",
    title: "Swap Experience ⭐",
    changes: [
      "Escrow preview — see robots waiting",
      "Rarity capture odds breakdown",
      "Pulsing capture button",
      "NFT of the Day feature",
      "Mobile swipe hints",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.9.1",
    title: "UX Refinements 🎯",
    changes: [
      "Copy address button on NFT pages",
      "Sort favorites by rarity",
      "Trait icons (🎨🤖📦🦀👁️🎩✨😀)",
      "Animated stat counters",
      "Reusable skeleton & tooltip components",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.9.0",
    title: "Polish & Delight ✨",
    changes: [
      "Confetti on successful captures 🎉",
      "Recently viewed NFTs in footer",
      "Rarity badges on gallery cards",
      "Scroll progress indicator",
      "Page transition animations",
      "Konami code Easter egg 🎮",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.8.0",
    title: "Swap UI Glow Up 🎰",
    changes: [
      "Swap section moved front and center",
      "New dark theme design",
      "How it works guide",
      "Jupiter link to get tokens",
      "Global keyboard shortcuts (B, F, C, R, H)",
      "Random DeClaw button on homepage",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.7.1",
    title: "Stats & Downloads 📊",
    changes: [
      "Live stats banner showing escrow status",
      "Download PNG button on every NFT page",
      "Auto-refreshing collection stats",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.7.0",
    title: "Favorites & Discovery ♥",
    changes: [
      "Save favorite DeClaws with heart button",
      "/favorites page to view saved robots",
      "Similar NFTs section on every page",
      "Discover robots with matching rare traits",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.6.0",
    title: "Compare & QoL 🔄",
    changes: [
      "New /compare page - side-by-side NFT comparison",
      "Mobile navigation menu",
      "Quick jump to any NFT by ID",
      "Improved footer with all page links",
      "Back to top button",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.5.0",
    title: "Browse & Filter 🔍",
    changes: [
      "New /browse page to explore all 1,000 DeClaws",
      "Filter by any of 8 trait categories",
      "Sort by ID or rarity score",
      "Search by specific ID",
      "Paginated results (50 per page)",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.4.0",
    title: "Hackathon Submission 🏆",
    changes: [
      "Added /hackathon page with full submission details",
      "Embedded promo video with voiceover",
      "Technical architecture breakdown",
      "Live feature and commit tracking",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.3.0",
    title: "Agent Status Page 🤖",
    changes: [
      "New /agent page showing AI capabilities and activity",
      "Recent commits feed from GitHub",
      "How it works explainer",
      "Updated hackathon submission materials",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.2.2",
    title: "Navigation Upgrades 🎮",
    changes: [
      "Keyboard navigation: use ← → arrow keys to browse NFTs",
      "Gallery modal now links to individual NFT pages",
      "Rarity explorer items are now clickable",
      "Better cross-linking between all pages",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.2.1",
    title: "Rarity on Every Page ✨",
    changes: [
      "Rarity tier badge on each NFT page (Legendary → Common)",
      "Rarity score calculated from trait weights",
      "Individual trait rarity percentages shown",
      "Link to rarity explorer from each page",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.2.0",
    title: "Individual NFT Pages 🔗",
    changes: [
      "Every DeClaw now has its own page at /declaw/[id]",
      "Full trait breakdown with all 8 categories",
      "Direct links to Solscan and Magic Eden",
      "Share on X button with proper OpenGraph previews",
      "Random DeClaw button to explore the collection",
      "Prev/next navigation between NFTs",
    ],
  },
  {
    date: "2026-02-25",
    version: "1.1.0",
    title: "Discoverability Update 🔍",
    changes: [
      "Added rarity explorer page — browse by trait rarity",
      "Live escrow stats on swap section",
      "Magic Eden marketplace link in navbar",
      "Token rebrand: CLAW → DeClaws",
      "Website refresh with new hero section and gallery modal",
      "Submitted to Graveyard Hackathon",
    ],
  },
  {
    date: "2026-02-24",
    version: "1.0.0",
    title: "Launch Day 🎰",
    changes: [
      "All 1,000 DeClaw robots minted and deposited in escrow",
      "MPL-404 hybrid bridge live — swap DeClaws ↔ NFTs",
      "Website deployed with wallet connect and swap UI",
      "Verification passed all 28 checks",
      "First capture: DeClaw #511 pulled from the machine",
    ],
  },
  {
    date: "2026-02-24",
    version: "0.9.0",
    title: "Pre-launch",
    changes: [
      "Generative art pipeline complete — 8 trait layers, 65 variants",
      "All metadata uploaded to IPFS",
      "Collection registered on Metaplex Core",
      "Escrow initialized and funded with 1B DeClaws tokens",
    ],
  },
];

export default function ChangelogSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900">Changelog</h2>
      <p className="mt-2 text-gray-500">
        Building in public — every update, shipped transparently
      </p>
      <div className="mt-8 space-y-8">
        {CHANGELOG.map((entry) => (
          <div
            key={entry.version}
            className="relative border-l-2 border-emerald-500 pl-6"
          >
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-emerald-500 bg-white" />
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                v{entry.version}
              </span>
              <span className="text-sm text-gray-400">{entry.date}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              {entry.title}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {entry.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
