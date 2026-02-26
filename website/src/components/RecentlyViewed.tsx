"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getRecentlyViewed } from "@/lib/recentlyViewed";
import { imageUrl } from "@/lib/constants";

export default function RecentlyViewed() {
  const [recentIds, setRecentIds] = useState<number[]>([]);

  useEffect(() => {
    setRecentIds(getRecentlyViewed());
  }, []);

  if (recentIds.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Recently Viewed</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {recentIds.map((id) => (
          <Link
            key={id}
            href={`/declaw/${id}`}
            className="flex-shrink-0 group"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 group-hover:border-gray-400 transition-colors">
              <img
                src={imageUrl(id)}
                alt={`DeClaw #${id}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
