"use client";

import { useState } from "react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
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
  const [escrowLoading, setEscrowLoading] = useState(false);

  const canBuy = publicKey && balance >= SWAP_AMOUNT;

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
    setLoading(true);
    setStatus("Capturing NFT...");
    try {
      await executeCaptureV1(getUmi(), randomNft.id);
      setStatus("Capture successful! You got a DeClaw NFT.");
      refreshBalance();
      refreshUserNfts();
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
      await executeReleaseV1(getUmi(), selectedNft.id);
      setStatus("Release successful! You received 1,000,000 CLAW.");
      setSelectedNft(null);
      refreshBalance();
      refreshUserNfts();
    } catch (err) {
      setStatus(`Release failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  // Extract NFT ID from name like "DeClaw #42"
  function getNftId(nft: DasAsset): number {
    const match = nft.content.metadata.name.match(/#(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  if (!publicKey) {
    return (
      <div className="rounded-lg border border-gray-100 bg-gray-50 p-8 text-center">
        <p className="text-gray-500">Connect your wallet to swap</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50">
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
          <span className="text-sm text-gray-500">CLAW Balance</span>
          <span className="font-medium text-gray-900">
            {balance.toLocaleString()} CLAW
          </span>
        </div>

        {/* Escrow info */}
        {escrow && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3">
            <span className="text-sm text-gray-500">Swap Rate</span>
            <span className="font-medium text-gray-900">
              1,000,000 CLAW = 1 NFT
            </span>
          </div>
        )}

        {tab === "buy" ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Pay {SWAP_AMOUNT.toLocaleString()} CLAW to capture a random DeClaw
              NFT from the escrow.
            </p>
            {escrowNfts.length === 0 && !escrowLoading && (
              <button
                onClick={loadEscrowNfts}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
              >
                Load available NFTs
              </button>
            )}
            {escrowLoading && (
              <p className="text-sm text-gray-400">Loading escrow NFTs...</p>
            )}
            {escrowNfts.length > 0 && (
              <p className="text-sm text-gray-400">
                {escrowNfts.length} NFTs available in escrow
              </p>
            )}
            <button
              onClick={handleBuy}
              disabled={!canBuy || loading || escrowNfts.length === 0}
              className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {loading ? "Processing..." : "Capture NFT"}
            </button>
            {!canBuy && publicKey && (
              <p className="text-xs text-gray-400">
                You need at least {SWAP_AMOUNT.toLocaleString()} CLAW
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Send a DeClaw NFT back to the escrow and receive{" "}
              {SWAP_AMOUNT.toLocaleString()} CLAW.
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
                        <Image
                          src={nft.content.links?.image || imageUrl(nftId)}
                          alt={nft.content.metadata.name}
                          fill
                          className="object-cover"
                          sizes="80px"
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
          <p className="mt-4 rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm text-gray-600">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
