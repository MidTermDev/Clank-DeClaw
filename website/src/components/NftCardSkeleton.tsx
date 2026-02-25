export default function NftCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300" />
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function NftCardSkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <NftCardSkeleton key={i} />
      ))}
    </div>
  );
}
