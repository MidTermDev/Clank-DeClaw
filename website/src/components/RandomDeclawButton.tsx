"use client";

import { useRouter } from "next/navigation";

export default function RandomDeclawButton() {
  const router = useRouter();

  const goToRandom = () => {
    const randomId = Math.floor(Math.random() * 1000);
    router.push(`/declaw/${randomId}`);
  };

  return (
    <button
      onClick={goToRandom}
      className="inline-block rounded-lg bg-emerald-500 px-6 py-3 text-white font-medium hover:bg-emerald-600 transition-colors"
    >
      🎲 Random DeClaw
    </button>
  );
}
