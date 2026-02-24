"use client";

const CHANGELOG = [
  {
    date: "2026-02-24",
    version: "1.0.0",
    title: "Launch Day 🎰",
    changes: [
      "All 1,000 DeClaw robots minted and deposited in escrow",
      "MPL-404 hybrid bridge live — swap CLAW ↔ NFTs",
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
      "Escrow initialized and funded with 1B CLAW tokens",
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
