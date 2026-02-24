export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;
export const COLLECTION_ADDRESS = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS!;
export const ESCROW_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_ADDRESS!;
export const CLAW_TOKEN_MINT = process.env.NEXT_PUBLIC_CLAW_TOKEN_MINT!;
export const FEE_LOCATION = process.env.NEXT_PUBLIC_FEE_LOCATION!;
export const IMAGES_CID = process.env.NEXT_PUBLIC_IMAGES_CID!;
export const METADATA_CID = process.env.NEXT_PUBLIC_METADATA_CID!;

export const MPL_HYBRID_PROGRAM_ID = "MPL4o4wMzndgh8T1NVDxELQCj5UQfYTYEkabX3wNKtb";

export const CLAW_DECIMALS = 6;
export const SWAP_AMOUNT = 1_000_000; // 1M CLAW per NFT

export const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs";
export const imageUrl = (id: number) => `${IPFS_GATEWAY}/${IMAGES_CID}/${id}.png`;
export const metadataUrl = (id: number) => `${IPFS_GATEWAY}/${METADATA_CID}/${id}.json`;

export const GALLERY_IDS = [0, 7, 23, 42, 99, 128, 256, 333, 404, 500, 666, 777, 888, 999];

export const SOCIAL_LINKS = {
  twitter: "https://x.com/ClankDeClaw",
  github: "https://github.com/MidTermDev/Clank-DeClaw/",
};
