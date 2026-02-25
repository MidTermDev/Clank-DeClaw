import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

const sizes = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
};

export default function Avatar({ 
  src, 
  alt = "Avatar", 
  size = "md", 
  fallback,
  className = "" 
}: AvatarProps) {
  if (src) {
    return (
      <div className={`relative rounded-full overflow-hidden ${sizes[size]} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // Fallback to initials or icon
  return (
    <div className={`flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600 ${sizes[size]} ${className}`}>
      {fallback || "🤖"}
    </div>
  );
}
