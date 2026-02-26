"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { imageUrl } from "@/lib/constants";

interface SearchResult {
  id: number;
  matchType: "id" | "trait";
  matchText?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [manifest, setManifest] = useState<Array<{ id: number; traits: Record<string, string> }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/trait-manifest.json")
      .then((res) => res.json())
      .then(setManifest)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search by ID
    const numQuery = parseInt(query);
    if (!isNaN(numQuery) && numQuery >= 0 && numQuery < 1000) {
      searchResults.push({ id: numQuery, matchType: "id" });
    }

    // Search by trait
    manifest.forEach((nft) => {
      Object.entries(nft.traits).forEach(([category, value]) => {
        if (value.toLowerCase().includes(lowerQuery)) {
          if (!searchResults.find((r) => r.id === nft.id)) {
            searchResults.push({ 
              id: nft.id, 
              matchType: "trait", 
              matchText: `${category}: ${value}` 
            });
          }
        }
      });
    });

    setResults(searchResults.slice(0, 8));
  }, [query, manifest]);

  const handleSelect = (id: number) => {
    router.push(`/declaw/${id}`);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by ID or trait..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result.id)}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-50 text-left group"
            >
              <img
                src={imageUrl(result.id)}
                alt={`DeClaw #${result.id}`}
                className="w-10 h-10 rounded-lg object-cover group-hover:scale-110 transition-transform"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23e5e7eb" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%236b7280">%23${result.id}</text></svg>`;
                }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">DeClaw #{result.id}</p>
                {result.matchText && (
                  <p className="text-xs text-gray-500">{result.matchText}</p>
                )}
              </div>
              <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
