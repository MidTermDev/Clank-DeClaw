"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GALLERY_IDS, imageUrl, metadataUrl } from "@/lib/constants";

interface NftMeta {
  id: number;
  name: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
}

export default function GallerySection() {
  const [nfts, setNfts] = useState<NftMeta[]>([]);

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
        A curated sample from the 1,000-piece collection
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50"
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
                {nft.attributes.slice(0, 3).map((attr) => (
                  <span
                    key={attr.trait_type}
                    className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500"
                  >
                    {attr.value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
