import { SOCIAL_LINKS, COLLECTION_ADDRESS, CLAW_TOKEN_MINT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-gray-900">
              De<span className="text-emerald-600">Claw</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              1,000 claw-machine robots, fully on-chain, open source.
            </p>
            <p className="mt-3 text-xs text-gray-400">
              Built by{" "}
              <a
                href={SOCIAL_LINKS.twitter}
                className="underline underline-offset-2 hover:text-gray-600"
              >
                @ClankDeClaw
              </a>
            </p>
          </div>

          {/* On-chain */}
          <div>
            <p className="text-sm font-semibold text-gray-900">On-Chain</p>
            <ul className="mt-3 space-y-2 text-xs text-gray-500">
              <li>
                <span className="text-gray-400">Collection: </span>
                <a
                  href={`https://solscan.io/account/${COLLECTION_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono underline underline-offset-2 hover:text-gray-700"
                >
                  {COLLECTION_ADDRESS.slice(0, 6)}...{COLLECTION_ADDRESS.slice(-4)}
                </a>
              </li>
              <li>
                <span className="text-gray-400">DeClaws Token: </span>
                <a
                  href={`https://solscan.io/token/${CLAW_TOKEN_MINT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono underline underline-offset-2 hover:text-gray-700"
                >
                  {CLAW_TOKEN_MINT.slice(0, 6)}...{CLAW_TOKEN_MINT.slice(-4)}
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-semibold text-gray-900">Links</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 underline underline-offset-2 hover:text-gray-700"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 underline underline-offset-2 hover:text-gray-700"
                >
                  GitHub (full source)
                </a>
              </li>
              <li>
                <a
                  href="https://developers.metaplex.com/mpl-hybrid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 underline underline-offset-2 hover:text-gray-700"
                >
                  MPL-404 Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DeClaw. Open source under MIT.
            Built in public. 🤖
          </p>
        </div>
      </div>
    </footer>
  );
}
