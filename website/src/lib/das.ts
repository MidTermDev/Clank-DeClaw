import { RPC_URL, COLLECTION_ADDRESS } from "./constants";

interface DasAsset {
  id: string;
  content: {
    json_uri: string;
    metadata: {
      name: string;
      symbol: string;
    };
    links?: {
      image?: string;
    };
  };
  grouping: Array<{
    group_key: string;
    group_value: string;
  }>;
}

interface DasResponse {
  result: {
    items: DasAsset[];
    total: number;
    page: number;
  };
}

export async function fetchUserDeClawNfts(ownerAddress: string): Promise<DasAsset[]> {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "declaw-user-nfts",
      method: "getAssetsByOwner",
      params: {
        ownerAddress,
        page: 1,
        limit: 1000,
      },
    }),
  });

  const data: DasResponse = await response.json();
  return data.result.items.filter((asset) =>
    asset.grouping.some(
      (g) => g.group_key === "collection" && g.group_value === COLLECTION_ADDRESS
    )
  );
}

export async function fetchEscrowNfts(): Promise<DasAsset[]> {
  // Escrow is the owner of NFTs held in the escrow
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "declaw-escrow-nfts",
      method: "getAssetsByOwner",
      params: {
        ownerAddress: "HDKAQxFVSq9HofTmRt5fRZKMjUEUHtKYXcqgurte3UEq",
        page: 1,
        limit: 1000,
      },
    }),
  });

  const data: DasResponse = await response.json();
  return data.result.items.filter((asset) =>
    asset.grouping.some(
      (g) => g.group_key === "collection" && g.group_value === COLLECTION_ADDRESS
    )
  );
}

export type { DasAsset };
