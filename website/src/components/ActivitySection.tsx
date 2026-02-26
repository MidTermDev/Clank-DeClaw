import ActivityFeed from "./ActivityFeed";
import Link from "next/link";

export default function ActivitySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Activity Feed */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              <p className="mt-1 text-gray-500">Latest captures and releases</p>
            </div>
            <Link
              href="/stats"
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              View stats →
            </Link>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <ActivityFeed />
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Stats</h2>
            <p className="mt-1 text-gray-500">Collection at a glance</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-5 text-white">
              <p className="text-emerald-100 text-sm">Total Supply</p>
              <p className="text-3xl font-bold mt-1">1,000</p>
              <p className="text-emerald-100 text-xs mt-1">Unique robots</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-5 text-white">
              <p className="text-purple-100 text-sm">Swap Rate</p>
              <p className="text-3xl font-bold mt-1">1M CLAW</p>
              <p className="text-purple-100 text-xs mt-1">Per NFT swap</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white">
              <p className="text-amber-100 text-sm">Traits</p>
              <p className="text-3xl font-bold mt-1">65</p>
              <p className="text-amber-100 text-xs mt-1">Unique variants</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 p-5 text-white">
              <p className="text-gray-300 text-sm">Categories</p>
              <p className="text-3xl font-bold mt-1">8</p>
              <p className="text-gray-300 text-xs mt-1">Trait types</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 p-5">
            <p className="text-sm text-gray-500">How it works</p>
            <p className="mt-2 text-gray-700">
              Send <span className="font-bold text-emerald-600">1,000,000 CLAW</span> to capture a random robot, 
              or release any DeClaw NFT to get your CLAW back. Instant liquidity, no marketplace needed.
            </p>
            <Link
              href="/docs"
              className="inline-block mt-3 text-sm text-emerald-600 hover:text-emerald-700"
            >
              Read the docs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
