interface DividerProps {
  text?: string;
  className?: string;
}

export default function Divider({ text, className = "" }: DividerProps) {
  if (text) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">{text}</span>
        </div>
      </div>
    );
  }

  return <div className={`border-t border-gray-200 ${className}`} />;
}
