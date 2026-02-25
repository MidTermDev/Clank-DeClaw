import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ 
  icon = "🤖", 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 text-gray-500 max-w-sm mx-auto">{description}</p>
      )}
      {action && (
        <Link
          href={action.href}
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
