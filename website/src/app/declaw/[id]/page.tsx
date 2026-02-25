import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import RandomDeclawButton from "@/components/RandomDeclawButton";
import { imageUrl, metadataUrl } from "@/lib/constants";
import mintedAssets from "@/lib/minted-assets.json";

interface Props {
  params: Promise<{ id: string }>;
}

interface NftAttribute {
  trait_type: string;
  value: string;
}

interface NftMetadata {
  name: string;
  description: string;
  image: string;
  attributes: NftAttribute[];
}

async function getNftData(id: number): Promise<NftMetadata | null> {
  try {
    const res = await fetch(metadataUrl(id), { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function getAssetAddress(id: number): string | null {
  const asset = mintedAssets.find((a: { id: number; address: string }) => a.id === id);
  return asset?.address || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const nftId = parseInt(id, 10);
  
  if (isNaN(nftId) || nftId < 0 || nftId > 999) {
    return { title: "Not Found | DeClaw" };
  }

  const metadata = await getNftData(nftId);
  const title = `DeClaw #${nftId} | Claw Machine Robots on Solana`;
  const description = metadata?.description || `DeClaw #${nftId} - One of 1,000 unique claw-machine robots on Solana. View traits, rarity, and swap via MPL-404.`;
  const image = imageUrl(nftId);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 512, height: 512, alt: `DeClaw #${nftId}` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ClankDeClaw",
    },
  };
}

export default async function DeclawPage({ params }: Props) {
  const { id } = await params;
  const nftId = parseInt(id, 10);

  if (isNaN(nftId) || nftId < 0 || nftId > 999) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Not Found</h1>
          <p className="mt-4 text-gray-500">DeClaw #{id} doesn&apos;t exist. Valid IDs are 0-999.</p>
          <Link href="/" className="mt-8 inline-block rounded-lg bg-emerald-500 px-6 py-3 text-white hover:bg-emerald-600">
            Back to Home
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const metadata = await getNftData(nftId);
  const assetAddress = getAssetAddress(nftId);
  const image = imageUrl(nftId);

  const prevId = nftId > 0 ? nftId - 1 : 999;
  const nextId = nftId < 999 ? nftId + 1 : 0;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href={`/declaw/${prevId}`}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span>←</span>
            <span>#{prevId}</span>
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
            Back to Collection
          </Link>
          <Link 
            href={`/declaw/${nextId}`}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span>#{nextId}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <Image
              src={image}
              alt={`DeClaw #${nftId}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              DeClaw #{nftId}
            </h1>
            <p className="mt-2 text-gray-500">
              One of 1,000 unique claw-machine robots
            </p>

            {/* Traits */}
            {metadata?.attributes && metadata.attributes.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-medium text-gray-700 mb-3">Traits</h2>
                <div className="grid grid-cols-2 gap-3">
                  {metadata.attributes.map((attr) => (
                    <div
                      key={attr.trait_type}
                      className="rounded-xl bg-gray-50 p-3 border border-gray-100"
                    >
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        {attr.trait_type}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {attr.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="mt-8 space-y-3">
              {assetAddress && (
                <a
                  href={`https://solscan.io/token/${assetAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-gray-50 p-4 border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">View on Solscan</span>
                  <span className="text-gray-400">↗</span>
                </a>
              )}
              <a
                href={`https://magiceden.io/item-details/solana/${assetAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-purple-50 p-4 border border-purple-100 hover:border-purple-200 transition-colors"
              >
                <span className="text-sm font-medium text-purple-900">View on Magic Eden</span>
                <span className="text-purple-400">↗</span>
              </a>
            </div>

            {/* Share */}
            <div className="mt-8">
              <h2 className="text-sm font-medium text-gray-700 mb-3">Share</h2>
              <ShareButtons nftId={nftId} />
            </div>
          </div>
        </div>

        {/* Random */}
        <div className="mt-12 text-center">
          <RandomDeclawButton />
        </div>
      </div>

      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  return Array.from({ length: 1000 }, (_, i) => ({ id: String(i) }));
}
