"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickJump() {
  const [id, setId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(id, 10);
    if (!isNaN(num) && num >= 0 && num <= 999) {
      router.push(`/declaw/${num}`);
    }
  };

  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 1000);
    router.push(`/declaw/${randomId}`);
  };

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID (0-999)"
          className="w-36 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          Go
        </button>
      </form>
      <button
        onClick={handleRandom}
        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
      >
        🎲 Random
      </button>
    </div>
  );
}
