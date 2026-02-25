interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  label?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const variants = {
  default: "bg-gray-900 text-white hover:bg-gray-800",
  ghost: "text-gray-600 hover:bg-gray-100",
  outline: "border border-gray-200 text-gray-600 hover:bg-gray-50",
};

const sizes = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

export default function IconButton({
  icon,
  onClick,
  label,
  variant = "ghost",
  size = "md",
  disabled = false,
  className = "",
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon}
    </button>
  );
}
