export default function SocialProof() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Built with
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {/* Solana */}
          <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.64 4.4a.44.44 0 01.31.13l2.92 3.09a.44.44 0 01-.32.75H4.45a.22.22 0 01-.16-.37l2.92-3.1a.44.44 0 01.31-.13h10.12zM4.13 11.81a.44.44 0 01.32-.13h16.1a.22.22 0 01.16.37l-2.92 3.1a.44.44 0 01-.31.13H7.36a.44.44 0 01-.31-.13l-2.92-3.1a.22.22 0 010-.24zM17.64 15.68a.44.44 0 01.31.13l2.92 3.09a.44.44 0 01-.32.75H4.45a.22.22 0 01-.16-.37l2.92-3.1a.44.44 0 01.31-.13h10.12z"/>
            </svg>
            <span className="font-medium">Solana</span>
          </div>

          {/* Metaplex */}
          <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="text-xl">🎨</span>
            <span className="font-medium">Metaplex Core</span>
          </div>

          {/* MPL-404 */}
          <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="text-xl">🔄</span>
            <span className="font-medium">MPL-404</span>
          </div>

          {/* IPFS */}
          <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="text-xl">📦</span>
            <span className="font-medium">IPFS</span>
          </div>

          {/* Open Source */}
          <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="text-xl">💚</span>
            <span className="font-medium">Open Source</span>
          </div>
        </div>
      </div>
    </section>
  );
}
