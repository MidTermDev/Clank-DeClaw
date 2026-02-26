"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { imageUrl } from "@/lib/constants";

export default function RandomPage() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(true);
  const [displayId, setDisplayId] = useState(0);
  const [finalId, setFinalId] = useState<number | null>(null);

  useEffect(() => {
    // Pick the final ID immediately
    const final = Math.floor(Math.random() * 1000);
    setFinalId(final);

    // Spin through random IDs for effect
    let frame = 0;
    const maxFrames = 30;
    const interval = setInterval(() => {
      frame++;
      if (frame < maxFrames) {
        setDisplayId(Math.floor(Math.random() * 1000));
      } else {
        setDisplayId(final);
        setSpinning(false);
        clearInterval(interval);
        // Redirect after a short pause
        setTimeout(() => {
          router.push(`/declaw/${final}`);
        }, 1500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            {spinning ? "🎰 Spinning..." : "🎉 Found one!"}
          </h1>
          <p className="text-gray-400 mb-8">
            {spinning ? "Finding a random robot..." : "Taking you there..."}
          </p>

          {/* Robot display */}
          <div className={`relative mx-auto w-64 h-64 ${spinning ? "animate-pulse" : ""}`}>
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 ${spinning ? "animate-spin-slow" : ""}`} style={{ padding: "4px" }}>
              <div className="w-full h-full rounded-2xl bg-gray-900 overflow-hidden">
                <img
                  src={imageUrl(displayId)}
                  alt={`DeClaw #${displayId}`}
                  className={`w-full h-full object-cover ${spinning ? "blur-sm scale-110" : "blur-0 scale-100"} transition-all duration-300`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%231f2937" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%236b7280">%23${displayId}</text></svg>`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* ID display */}
          <div className="mt-6">
            <span className={`text-6xl font-mono font-bold ${spinning ? "text-gray-500" : "text-emerald-400"} transition-colors`}>
              #{displayId.toString().padStart(3, "0")}
            </span>
          </div>

          {/* Spin again button */}
          {!spinning && (
            <button
              onClick={() => window.location.reload()}
              className="mt-8 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              🎲 Spin Again
            </button>
          )}
        </div>

        {/* Fun facts */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>1 in 1,000 chance of landing on any robot</p>
          <p className="mt-1">Every spin is a new adventure</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </main>
  );
}
