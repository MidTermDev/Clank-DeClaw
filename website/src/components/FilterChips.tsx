"use client";

interface FilterChipsProps {
  filters: { key: string; value: string }[];
  onRemove: (key: string) => void;
  onClear: () => void;
}

export default function FilterChips({ filters, onRemove, onClear }: FilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500">Filters:</span>
      {filters.map(({ key, value }) => (
        <button
          key={key}
          onClick={() => onRemove(key)}
          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 hover:bg-emerald-200 transition-colors"
        >
          <span>{value}</span>
          <span className="text-emerald-600">×</span>
        </button>
      ))}
      <button
        onClick={onClear}
        className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
      >
        Clear all
      </button>
    </div>
  );
}
