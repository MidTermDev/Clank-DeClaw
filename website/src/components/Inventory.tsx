"use client";

import { useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserNfts } from "@/hooks/useUserNfts";
import { useClawBalance } from "@/hooks/useClawBalance";
import { IPFS_GATEWAY, IMAGES_CID } from "@/lib/constants";

function BackpackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
      <path d="M8 8V5a4 4 0 0 1 8 0v3" />
      <path d="M8 14h8" />
    </svg>
  );
}

export default function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const { publicKey } = useWallet();
  const { nfts, loading } = useUserNfts();
  const { balance } = useClawBalance();

  // Extract NFT ID from name
  const getNftId = (name: string): number => {
    const match = name.match(/#(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  if (!publicKey) return null;

  return (
    <>
      {/* Backpack Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-white shadow-lg hover:bg-gray-800 transition-all hover:scale-105"
      >
        <BackpackIcon />
        <span className="text-sm font-medium">
          {nfts.length} NFT{nfts.length !== 1 ? "s" : ""}
        </span>
      </button>

      {/* Inventory Panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          {/* Slide-in Panel */}
          <div 
            className="relative w-full max-w-md bg-white shadow-2xl animate-slide-in-right overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BackpackIcon />
                <div>
                  <h2 className="font-bold">Your Inventory</h2>
                  <p className="text-xs text-gray-400">
                    {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Balance */}
            <div className="bg-emerald-50 border-b border-emerald-100 p-4">
              <p className="text-xs text-emerald-600 font-medium">DeClaws Balance</p>
              <p className="text-2xl font-bold text-emerald-700">
                {balance.toLocaleString()}
              </p>
            </div>

            {/* NFT Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
                </div>
              ) : nfts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-4">🤖</p>
                  <p className="text-gray-500">No DeClaws yet</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Capture one from the claw machine!
                  </p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      document.querySelector("#swap")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Try the Claw Machine
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-4">
                    {nfts.length} DeClaw{nfts.length !== 1 ? "s" : ""} in your wallet
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {nfts.map((nft) => {
                      const id = getNftId(nft.content.metadata.name);
                      return (
                        <Link
                          key={nft.id}
                          href={`/declaw/${id}`}
                          onClick={() => setIsOpen(false)}
                          className="group"
                        >
                          <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-100 group-hover:border-emerald-400 transition-colors">
                            <img
                              src={`${IPFS_GATEWAY}/${IMAGES_CID}/${id}.png`}
                              alt={nft.content.metadata.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="mt-1 text-xs text-center text-gray-600 group-hover:text-emerald-600">
                            #{id}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {nfts.length > 0 && (
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <Link
                  href="/favorites"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center text-sm text-emerald-600 hover:text-emerald-700"
                >
                  View Favorites →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
