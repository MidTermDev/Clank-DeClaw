"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_IDS, imageUrl, metadataUrl } from "@/lib/constants";

interface NftMeta {
  id: number;
  name: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
}

export default function GallerySection() {
  const [nfts, setNfts] = useState<NftMeta[]>([]);
  const [selectedNft, setSelectedNft] = useState<NftMeta | null>(null);

  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        GALLERY_IDS.map(async (id) => {
          try {
            const res = await fetch(metadataUrl(id));
            const json = await res.json();
            return {
              id,
              name: json.name,
              image: imageUrl(id),
              attributes: json.attributes || [],
            } as NftMeta;
          } catch {
            return {
              id,
              name: `DeClaw #${id}`,
              image: imageUrl(id),
              attributes: [],
            } as NftMeta;
          }
        })
      );
      setNfts(results);
    }
    load();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
      <p className="mt-2 text-gray-500">
        A curated sample from the collection — click any robot for details
      </p>
      
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {nfts.map((nft) => (
          <button
            key={nft.id}
            onClick={() => setSelectedNft(nft)}
            className="nft-card overflow-hidden rounded-lg border border-gray-100 bg-gray-50 text-left transition-all hover:border-emerald-200"
          >
            <div className="relative aspect-square">
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900">{nft.name}</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {nft.attributes.slice(0, 2).map((attr) => (
                  <span
                    key={attr.trait_type}
                    className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500"
                  >
                    {attr.value}
                  </span>
                ))}
                {nft.attributes.length > 2 && (
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-400">
                    +{nft.attributes.length - 2}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedNft && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedNft(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-md overflow-auto rounded-xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={selectedNft.image}
                alt={selectedNft.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">
              {selectedNft.name}
            </h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">Traits</p>
              <div className="grid grid-cols-2 gap-2">
                {selectedNft.attributes.map((attr) => (
                  <div
                    key={attr.trait_type}
                    className="rounded-lg bg-gray-50 p-2"
                  >
                    <p className="text-xs text-gray-500">{attr.trait_type}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Link
                href={`/declaw/${selectedNft.id}`}
                className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                View Full Page
              </Link>
              <button
                onClick={() => setSelectedNft(null)}
                className="flex-1 rounded-lg bg-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
