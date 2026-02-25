"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

export default function AnimatedNumber({ value, duration = 1000, className = "" }: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = timestamp - startRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out quad
      const eased = 1 - (1 - percentage) * (1 - percentage);
      setCurrent(Math.floor(eased * value));
      
      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  return <span className={className}>{current.toLocaleString()}</span>;
}
