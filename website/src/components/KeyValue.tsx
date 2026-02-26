interface KeyValueProps {
  label: string;
  value: string | number;
  copyable?: boolean;
  className?: string;
}

export default function KeyValue({
  label,
  value,
  copyable = false,
  className = "",
}: KeyValueProps) {
  const handleCopy = () => {
    if (typeof navigator !== "undefined" && copyable) {
      navigator.clipboard.writeText(String(value));
    }
  };

  return (
    <div className={`flex items-center justify-between py-2 ${className}`}>
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`text-sm font-medium text-gray-900 ${
          copyable ? "cursor-pointer hover:text-emerald-600" : ""
        }`}
        onClick={copyable ? handleCopy : undefined}
        title={copyable ? "Click to copy" : undefined}
      >
        {value}
      </span>
    </div>
  );
}
