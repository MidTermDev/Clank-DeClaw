import { ReactNode } from "react";

interface AspectRatioProps {
  ratio?: "square" | "video" | "portrait";
  children: ReactNode;
  className?: string;
}

const ratios = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export default function AspectRatio({ ratio = "square", children, className = "" }: AspectRatioProps) {
  return (
    <div className={`relative overflow-hidden ${ratios[ratio]} ${className}`}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
