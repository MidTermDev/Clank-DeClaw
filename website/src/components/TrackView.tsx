"use client";

import { useEffect } from "react";
import { addRecentlyViewed } from "@/lib/recentlyViewed";

interface TrackViewProps {
  nftId: number;
}

export default function TrackView({ nftId }: TrackViewProps) {
  useEffect(() => {
    addRecentlyViewed(nftId);
  }, [nftId]);

  return null;
}
