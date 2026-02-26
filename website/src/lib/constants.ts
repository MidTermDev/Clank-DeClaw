export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;
export const COLLECTION_ADDRESS = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS!;
export const ESCROW_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_ADDRESS!;
export const CLAW_TOKEN_MINT = process.env.NEXT_PUBLIC_CLAW_TOKEN_MINT!;
export const FEE_LOCATION = process.env.NEXT_PUBLIC_FEE_LOCATION!;
// Hardcoded for reliability - env vars can be flaky in builds
export const IMAGES_CID = "bafybeidgrbt7retu2vj4lq7e32u5cqrlbtcfugmkkszgt7x42zgkdchux4";
export const METADATA_CID = "bafybeian5z6oxfrz2iv52j2f7fnaiotpi4aocnn3d5uxop7a36y5akj47i";

export const MPL_HYBRID_PROGRAM_ID = "MPL4o4wMzndgh8T1NVDxELQCj5UQfYTYEkabX3wNKtb";

export const CLAW_DECIMALS = 6;
export const SWAP_AMOUNT = 1_000_000; // 1M CLAW per NFT

export const IPFS_GATEWAY = "https://ipfs.io/ipfs";
// Local images for instant loading - fallback to IPFS if needed
export const imageUrl = (id: number) => `/nfts/${id}.png`;
export const imageUrlIPFS = (id: number) => `${IPFS_GATEWAY}/${IMAGES_CID}/${id}.png`;
export const metadataUrl = (id: number) => `${IPFS_GATEWAY}/${METADATA_CID}/${id}.json`;

export const GALLERY_IDS = [0, 7, 23, 42, 99, 128, 256, 333, 404, 500, 666, 777, 888, 999];

export const SOCIAL_LINKS = {
  twitter: "https://x.com/ClankDeClaw",
  github: "https://github.com/MidTermDev/Clank-DeClaw/",
  website: "https://declaws.com",
};
