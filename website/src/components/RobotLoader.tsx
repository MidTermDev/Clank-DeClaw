"use client";

export default function RobotLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Robot body */}
        <div className="w-16 h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-xl rounded-b-lg relative animate-bounce">
          {/* Visor */}
          <div className="absolute top-3 left-2 right-2 h-6 bg-emerald-500 rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-shimmer" />
          </div>
          {/* Body details */}
          <div className="absolute bottom-4 left-3 right-3 h-6 bg-gray-600 rounded-sm" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        {/* Arms */}
        <div className="absolute top-8 -left-3 w-3 h-8 bg-gray-700 rounded-full animate-wave origin-top" />
        <div className="absolute top-8 -right-3 w-3 h-8 bg-gray-700 rounded-full animate-wave origin-top" style={{ animationDelay: '0.5s' }} />
        {/* Legs */}
        <div className="absolute -bottom-4 left-2 w-4 h-4 bg-gray-700 rounded-b-lg" />
        <div className="absolute -bottom-4 right-2 w-4 h-4 bg-gray-700 rounded-b-lg" />
      </div>
      <p className="mt-6 text-sm text-gray-500 animate-pulse">{text}</p>
    </div>
  );
}
