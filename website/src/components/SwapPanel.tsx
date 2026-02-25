"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import confetti from "canvas-confetti";
import { useUmiStore } from "@/hooks/useUmiStore";
import { useClawBalance } from "@/hooks/useClawBalance";
import { useUserNfts } from "@/hooks/useUserNfts";
import { useEscrow } from "@/hooks/useEscrow";
import { executeCaptureV1, executeReleaseV1 } from "@/lib/swap";
import { fetchEscrowNfts, type DasAsset } from "@/lib/das";
import { SWAP_AMOUNT, imageUrl } from "@/lib/constants";

type Tab = "buy" | "sell";

export default function SwapPanel() {
  const { publicKey } = useWallet();
  const getUmi = useUmiStore((s) => s.getUmi);
  const { balance, refresh: refreshBalance } = useClawBalance();
  const { nfts: userNfts, refresh: refreshUserNfts } = useUserNfts();
  const { escrow } = useEscrow();

  const [tab, setTab] = useState<Tab>("buy");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedNft, setSelectedNft] = useState<DasAsset | null>(null);
  const [escrowNfts, setEscrowNfts] = useState<DasAsset[]>([]);
  const [escrowLoading, setEscrowLoading] = useState(true);
  const [capturedNft, setCapturedNft] = useState<{ id: number; sig: string } | null>(null);

  const canBuy = publicKey && balance >= SWAP_AMOUNT;

  // Extract NFT ID from name like "DeClaw #42"
  const getNftId = (nft: DasAsset): number => {
    const match = nft.content.metadata.name.match(/#(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Auto-load escrow NFTs when wallet connects
  useEffect(() => {
    if (publicKey) {
      loadEscrowNfts();
    }
  }, [publicKey]);

  async function loadEscrowNfts() {
    setEscrowLoading(true);
    try {
      const nfts = await fetchEscrowNfts();
      setEscrowNfts(nfts);
    } catch {
      setEscrowNfts([]);
    } finally {
      setEscrowLoading(false);
    }
  }

  async function handleBuy() {
    if (!publicKey || escrowNfts.length === 0) return;
    // Pick a random NFT from the escrow
    const randomNft = escrowNfts[Math.floor(Math.random() * escrowNfts.length)];
    const nftId = getNftId(randomNft);
    setLoading(true);
    setStatus("Capturing NFT...");
    try {
      const sig = await executeCaptureV1(getUmi(), randomNft.id);
      // Show the captured NFT!
      setCapturedNft({ id: nftId, sig });
      setStatus(null);
      // Celebrate! 🎉
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399', '#6ee7b7'],
      });
      setTimeout(() => { 
        refreshBalance(); 
        refreshUserNfts();
        loadEscrowNfts(); // Refresh escrow list
      }, 5000);
    } catch (err) {
      setStatus(`Capture failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSell() {
    if (!publicKey || !selectedNft) return;
    setLoading(true);
    setStatus("Releasing NFT...");
    try {
      const sig = await executeReleaseV1(getUmi(), selectedNft.id);
      setStatus(`Release sent! View on Solscan: https://solscan.io/tx/${sig}`);
      setSelectedNft(null);
      setTimeout(() => { refreshBalance(); refreshUserNfts(); }, 5000);
    } catch (err) {
      setStatus(`Release failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  if (!publicKey) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4 text-4xl">🎰</div>
        <p className="text-gray-600 font-medium">Connect your wallet to swap</p>
        <p className="text-sm text-gray-400 mt-2">Use the wallet button in the navbar</p>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setTab("buy")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            tab === "buy"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Buy NFT
        </button>
        <button
          onClick={() => setTab("sell")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            tab === "sell"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Sell NFT
        </button>
      </div>

      <div className="p-6">
        {/* Balance display */}
        <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3">
          <span className="text-sm text-gray-500">DeClaws Balance</span>
          <span className="font-medium text-gray-900">
            {balance.toLocaleString()} DeClaws
          </span>
        </div>

        {/* Escrow info */}
        {escrow && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3">
            <span className="text-sm text-gray-500">Swap Rate</span>
            <span className="font-medium text-gray-900">
              1,000,000 DeClaws = 1 NFT
            </span>
          </div>
        )}

        {tab === "buy" ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Pay {SWAP_AMOUNT.toLocaleString()} DeClaws to capture a random DeClaw
              NFT from the escrow.
            </p>
            {escrowLoading ? (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="animate-spin h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full" />
                Loading available NFTs...
              </div>
            ) : escrowNfts.length > 0 ? (
              <p className="text-sm text-emerald-600 font-medium">
                ✓ {escrowNfts.length} NFTs ready to capture
              </p>
            ) : (
              <p className="text-sm text-gray-400">No NFTs available in escrow</p>
            )}
            <button
              onClick={handleBuy}
              disabled={!canBuy || loading || escrowNfts.length === 0}
              className={`relative w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-all ${
                canBuy && !loading && escrowNfts.length > 0
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/25"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {canBuy && !loading && escrowNfts.length > 0 && (
                <span className="absolute inset-0 rounded-lg animate-pulse bg-emerald-400 opacity-25" />
              )}
              <span className="relative">
                {loading ? "Processing..." : "🎰 Capture NFT"}
              </span>
            </button>
            {!canBuy && publicKey && (
              <p className="text-xs text-gray-400">
                You need at least {SWAP_AMOUNT.toLocaleString()} DeClaws
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Send a DeClaw NFT back to the escrow and receive{" "}
              {SWAP_AMOUNT.toLocaleString()} DeClaws.
            </p>
            {userNfts.length === 0 ? (
              <p className="text-sm text-gray-400">
                You don&apos;t have any DeClaw NFTs
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {userNfts.map((nft) => {
                  const nftId = getNftId(nft);
                  return (
                    <button
                      key={nft.id}
                      onClick={() => setSelectedNft(nft)}
                      className={`overflow-hidden rounded-lg border-2 transition-colors ${
                        selectedNft?.id === nft.id
                          ? "border-gray-900"
                          : "border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <div className="relative aspect-square">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl(nftId)}
                          alt={nft.content.metadata.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="truncate px-1 py-1 text-xs text-gray-600">
                        #{nftId}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
            <button
              onClick={handleSell}
              disabled={!selectedNft || loading}
              className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {loading ? "Processing..." : "Release NFT"}
            </button>
          </div>
        )}

        {/* Status message */}
        {status && (
          <div className="mt-4 rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm text-gray-600 break-all">
            {status.includes("https://solscan.io/tx/") ? (
              <>
                {status.split("https://solscan.io/tx/")[0]}
                <a
                  href={`https://solscan.io/tx/${status.split("https://solscan.io/tx/")[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline underline-offset-2"
                >
                  View on Solscan
                </a>
              </>
            ) : (
              status
            )}
          </div>
        )}
      </div>

      {/* Captured NFT Popup */}
      {capturedNft && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setCapturedNft(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-4 text-center">
              <p className="text-white text-lg font-bold">🎉 You captured it!</p>
            </div>
            <div className="p-6">
              <div className="relative aspect-square rounded-xl overflow-hidden border-4 border-emerald-200 shadow-lg">
                <img
                  src={imageUrl(capturedNft.id)}
                  alt={`DeClaw #${capturedNft.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900 text-center">
                DeClaw #{capturedNft.id}
              </h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                This robot is now yours!
              </p>
              <div className="mt-6 space-y-2">
                <Link
                  href={`/declaw/${capturedNft.id}`}
                  className="block w-full rounded-lg bg-emerald-600 py-3 text-center text-sm font-medium text-white hover:bg-emerald-700"
                  onClick={() => setCapturedNft(null)}
                >
                  View Your DeClaw
                </Link>
                <a
                  href={`https://solscan.io/tx/${capturedNft.sig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-gray-100 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  View Transaction ↗
                </a>
                <button
                  onClick={() => setCapturedNft(null)}
                  className="block w-full py-2 text-center text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
