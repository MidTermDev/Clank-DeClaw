import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4">
      {/* Robot illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-40 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-2xl rounded-b-lg relative">
          {/* Visor showing 404 */}
          <div className="absolute top-6 left-4 right-4 h-10 bg-red-500 rounded-sm flex items-center justify-center">
            <span className="text-white font-mono font-bold text-lg">404</span>
          </div>
          {/* Body */}
          <div className="absolute bottom-6 left-4 right-4 h-10 bg-gray-600 rounded-sm" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-red-400 rounded-full animate-pulse" />
        </div>
        {/* Arms drooping sadly */}
        <div className="absolute top-12 -left-4 w-4 h-10 bg-gray-700 rounded-full rotate-12" />
        <div className="absolute top-12 -right-4 w-4 h-10 bg-gray-700 rounded-full -rotate-12" />
        {/* Legs */}
        <div className="absolute -bottom-6 left-4 w-5 h-6 bg-gray-700 rounded-b-lg" />
        <div className="absolute -bottom-6 right-4 w-5 h-6 bg-gray-700 rounded-b-lg" />
        
        {/* Sad sweat drop */}
        <div className="absolute -right-2 top-8 text-2xl animate-bounce">💧</div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        This robot wandered off somewhere... The claw couldn't find the page you're looking for.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/browse"
          className="rounded-lg border border-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Browse Collection
        </Link>
      </div>
    </main>
  );
}
