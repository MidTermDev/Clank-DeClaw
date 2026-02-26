import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface RoadmapItem {
  phase: string;
  title: string;
  status: "done" | "current" | "upcoming";
  items: { text: string; done: boolean }[];
}

const roadmap: RoadmapItem[] = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done",
    items: [
      { text: "Generate 1,000 unique robot NFTs", done: true },
      { text: "Deploy on Solana mainnet", done: true },
      { text: "Set up MPL-404 escrow system", done: true },
      { text: "Create CLAW token", done: true },
      { text: "Fund escrow with all NFTs", done: true },
      { text: "Launch website", done: true },
      { text: "Open source everything", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Polish",
    status: "current",
    items: [
      { text: "Rarity explorer", done: true },
      { text: "NFT comparison tool", done: true },
      { text: "Favorites system", done: true },
      { text: "Stats dashboard", done: true },
      { text: "Documentation", done: true },
      { text: "Activity feed", done: true },
      { text: "Mobile optimizations", done: false },
      { text: "PWA support", done: false },
    ],
  },
  {
    phase: "Phase 3",
    title: "Community",
    status: "upcoming",
    items: [
      { text: "Discord server", done: false },
      { text: "Holder verification", done: false },
      { text: "Community events", done: false },
      { text: "Trait-based roles", done: false },
      { text: "Giveaways for holders", done: false },
    ],
  },
  {
    phase: "Phase 4",
    title: "Expansion",
    status: "upcoming",
    items: [
      { text: "Animated PFPs", done: false },
      { text: "3D robot viewer", done: false },
      { text: "Merch store", done: false },
      { text: "Staking rewards", done: false },
      { text: "Collaborations", done: false },
    ],
  },
];

function StatusBadge({ status }: { status: RoadmapItem["status"] }) {
  const styles = {
    done: "bg-emerald-100 text-emerald-700 border-emerald-200",
    current: "bg-amber-100 text-amber-700 border-amber-200 animate-pulse",
    upcoming: "bg-gray-100 text-gray-500 border-gray-200",
  };
  const labels = {
    done: "✓ Complete",
    current: "🔨 In Progress",
    upcoming: "📅 Planned",
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function RoadmapPage() {
  const totalItems = roadmap.flatMap((r) => r.items).length;
  const doneItems = roadmap.flatMap((r) => r.items).filter((i) => i.done).length;
  const progress = Math.round((doneItems / totalItems) * 100);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Roadmap</h1>
          <p className="mt-2 text-gray-500">Where we&apos;ve been and where we&apos;re going</p>
          
          {/* Progress bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Overall Progress</span>
              <span>{doneItems}/{totalItems} complete</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-600">{progress}%</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          <div className="space-y-12">
            {roadmap.map((phase, idx) => (
              <div key={phase.phase} className="relative">
                {/* Timeline dot */}
                <div className={`absolute left-8 w-4 h-4 rounded-full -translate-x-1/2 hidden md:block ${
                  phase.status === "done" ? "bg-emerald-500" :
                  phase.status === "current" ? "bg-amber-500 animate-ping" :
                  "bg-gray-300"
                }`} style={{ top: "1.5rem" }} />
                <div className={`absolute left-8 w-4 h-4 rounded-full -translate-x-1/2 hidden md:block ${
                  phase.status === "done" ? "bg-emerald-500" :
                  phase.status === "current" ? "bg-amber-500" :
                  "bg-gray-300"
                }`} style={{ top: "1.5rem" }} />

                <div className="md:ml-20">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-medium text-gray-400">{phase.phase}</span>
                    <h2 className="text-2xl font-bold text-gray-900">{phase.title}</h2>
                    <StatusBadge status={phase.status} />
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                            item.done 
                              ? "bg-emerald-100 text-emerald-600" 
                              : "bg-gray-100 text-gray-400"
                          }`}>
                            {item.done ? "✓" : "○"}
                          </span>
                          <span className={item.done ? "text-gray-700" : "text-gray-400"}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
          <h3 className="text-2xl font-bold">Want to contribute?</h3>
          <p className="mt-2 text-gray-300">DeClaw is 100% open source. PRs welcome!</p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/MidTermDev/Clank-DeClaw"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-3 text-gray-900 font-medium hover:bg-gray-100 transition-colors"
            >
              View on GitHub
            </a>
            <Link
              href="/docs"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
