"use client";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export default function Checkbox({ 
  checked, 
  onChange, 
  label, 
  description,
  disabled = false 
}: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <div className="pt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
          ${checked 
            ? "bg-emerald-500 border-emerald-500" 
            : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      {(label || description) && (
        <div>
          {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      )}
    </label>
  );
}
