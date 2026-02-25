"use client";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  name: string;
  className?: string;
}

export default function RadioGroup({ value, onChange, options, name, className = "" }: RadioGroupProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-emerald-200 transition-colors"
        >
          <div className="pt-0.5">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
              ${value === opt.value 
                ? "border-emerald-500" 
                : "border-gray-300"
              }`}
            >
              {value === opt.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              )}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-900">{opt.label}</span>
            {opt.description && <p className="text-sm text-gray-500">{opt.description}</p>}
          </div>
        </label>
      ))}
    </div>
  );
}
