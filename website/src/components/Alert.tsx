interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const styles = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "ℹ️",
    title: "text-blue-800",
    text: "text-blue-700",
  },
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "✅",
    title: "text-emerald-800",
    text: "text-emerald-700",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "⚠️",
    title: "text-amber-800",
    text: "text-amber-700",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "❌",
    title: "text-red-800",
    text: "text-red-700",
  },
};

export default function Alert({ type = "info", title, children, className = "" }: AlertProps) {
  const s = styles[type];

  return (
    <div className={`rounded-xl border ${s.bg} ${s.border} p-4 ${className}`}>
      <div className="flex gap-3">
        <span className="text-lg">{s.icon}</span>
        <div>
          {title && <h4 className={`font-medium ${s.title}`}>{title}</h4>}
          <div className={`${title ? "mt-1" : ""} text-sm ${s.text}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
