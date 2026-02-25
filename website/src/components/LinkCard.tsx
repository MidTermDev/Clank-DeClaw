import Link from "next/link";

interface LinkCardProps {
  href: string;
  title: string;
  description?: string;
  icon?: string;
  external?: boolean;
}

export default function LinkCard({ 
  href, 
  title, 
  description, 
  icon,
  external = false 
}: LinkCardProps) {
  const Component = external ? "a" : Link;
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      href={href}
      {...externalProps}
      className="group block rounded-xl border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl group-hover:bg-emerald-100 transition-colors">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
            {title}
            {external && <span className="ml-1 text-gray-400">↗</span>}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </Component>
  );
}
