"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
  className?: string;
}

export default function CountdownTimer({ targetDate, label, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeBox = ({ value, unit }: { value: number; unit: string }) => (
    <div className="text-center">
      <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xl font-mono font-bold min-w-[3rem]">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs text-gray-500 mt-1 uppercase">{unit}</div>
    </div>
  );

  return (
    <div className={className}>
      {label && <p className="text-sm text-gray-500 mb-3">{label}</p>}
      <div className="flex items-center gap-2">
        <TimeBox value={timeLeft.days} unit="Days" />
        <span className="text-gray-300 text-xl">:</span>
        <TimeBox value={timeLeft.hours} unit="Hours" />
        <span className="text-gray-300 text-xl">:</span>
        <TimeBox value={timeLeft.minutes} unit="Min" />
        <span className="text-gray-300 text-xl">:</span>
        <TimeBox value={timeLeft.seconds} unit="Sec" />
      </div>
    </div>
  );
}
