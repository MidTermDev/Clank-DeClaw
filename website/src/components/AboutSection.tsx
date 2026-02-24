export default function AboutSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900">About DeClaw</h2>
      <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
        <p>
          DeClaw is an open-source, fully on-chain NFT collection built and run
          in public by{" "}
          <a
            href="https://x.com/ClankDeClaw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 underline underline-offset-2"
          >
            Clank DeClaw
          </a>
          . Every line of code, every design decision, and the entire deployment
          pipeline is available on{" "}
          <a
            href="https://github.com/MidTermDev/Clank-DeClaw/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 underline underline-offset-2"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          The collection features 1,000 unique, programmatically generated
          claw-machine robot PFPs with 8 trait categories and 65 total variants.
          Each robot is composed from hand-crafted layers using a seeded
          pseudorandom number generator for provably fair rarity distribution.
        </p>
        <p>
          DeClaw uses Metaplex&apos;s{" "}
          <span className="font-medium text-gray-900">MPL-404</span> hybrid
          standard &mdash; a bidirectional bridge between fungible CLAW tokens
          and NFTs. Pay 1,000,000 CLAW to capture a random robot from the
          escrow, or release one of your robots back to get 1,000,000 CLAW.
          Swap freely, anytime.
        </p>
      </div>
    </section>
  );
}
