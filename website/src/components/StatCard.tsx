import AnimatedNumber from "./AnimatedNumber";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export default function StatCard({ label, value, suffix, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">
          <AnimatedNumber value={value} />
          {suffix}
        </span>
        {trend && (
          <span className={`text-sm font-medium ${trend.positive ? "text-emerald-600" : "text-red-600"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
