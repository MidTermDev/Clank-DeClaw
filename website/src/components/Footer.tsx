import { SOCIAL_LINKS, COLLECTION_ADDRESS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-medium text-gray-900">DeClaw</p>
            <p className="mt-1 text-xs text-gray-400">
              Collection:{" "}
              <a
                href={`https://solscan.io/account/${COLLECTION_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-gray-600"
              >
                {COLLECTION_ADDRESS.slice(0, 8)}...{COLLECTION_ADDRESS.slice(-4)}
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600"
            >
              X / Twitter
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-gray-300">
          &copy; {new Date().getFullYear()} DeClaw. Open source.
        </p>
      </div>
    </footer>
  );
}
