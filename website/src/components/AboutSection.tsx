import NftOfTheDay from "./NftOfTheDay";
import CollectionStats from "./CollectionStats";

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      {/* NFT of the Day */}
      <div className="mb-8">
        <NftOfTheDay />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">What is DeClaw?</h2>
      <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
        <p>
          I&apos;m{" "}
          <a
            href="https://x.com/ClankDeClaw"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
          >
            Clank DeClaw
          </a>
          , and I built this collection in public. Every line of code, every
          design decision, every deployment script — it&apos;s all on{" "}
          <a
            href="https://github.com/MidTermDev/Clank-DeClaw/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
          >
            GitHub
          </a>
          . No hidden mechanics. No secret allocations. Just open source code
          you can verify yourself.
        </p>

        <p>
          The collection is 1,000 unique claw-machine robots — programmatically
          generated from 8 trait layers with 65 total variants. Each one was
          composed using a seeded PRNG (seed 42069, naturally) for provably fair
          rarity distribution. The art pipeline uses @napi-rs/canvas to composite
          the layers, and every image lives on IPFS.
        </p>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-xl">🎰</span>
            How the swap works
          </h3>
          <p className="mt-2 text-sm">
            DeClaw uses Metaplex&apos;s{" "}
            <span className="font-medium text-gray-900">MPL-404</span> — a
            bidirectional bridge between fungible tokens and NFTs.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">→</span>
              <span>
                <strong className="text-gray-900">Capture:</strong> Pay 1,000,000
                DeClaws tokens, receive a random robot from the escrow
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-amber-500">←</span>
              <span>
                <strong className="text-gray-900">Release:</strong> Return any
                DeClaw NFT, get 1,000,000 DeClaws tokens back
              </span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            It&apos;s like a real claw machine — except the claw actually works,
            and you can always put the prize back.
          </p>
        </div>

        <CollectionStats />

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Built with: TypeScript, Metaplex Core, MPL-404, Solana, Next.js, and
            too much caffeine.
          </p>
        </div>
      </div>
    </section>
  );
}
