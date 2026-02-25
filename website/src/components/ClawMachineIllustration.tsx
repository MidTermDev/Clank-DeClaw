export default function ClawMachineIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Machine body */}
      <rect x="20" y="40" width="160" height="180" rx="8" fill="#1f2937" />
      <rect x="25" y="45" width="150" height="120" rx="4" fill="#374151" />
      
      {/* Glass display */}
      <rect x="30" y="50" width="140" height="110" rx="2" fill="#0d9488" opacity="0.2" />
      <rect x="30" y="50" width="140" height="110" rx="2" stroke="#10b981" strokeWidth="2" opacity="0.5" />
      
      {/* Claw arm */}
      <line x1="100" y1="20" x2="100" y2="70" stroke="#9ca3af" strokeWidth="4" />
      <path d="M85 70 L100 85 L115 70" stroke="#9ca3af" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Track at top */}
      <rect x="30" y="15" width="140" height="10" rx="2" fill="#4b5563" />
      
      {/* Prize robots */}
      <circle cx="60" cy="130" r="15" fill="#10b981" />
      <circle cx="60" cy="125" r="8" fill="#34d399" />
      <rect x="56" y="135" width="8" height="10" rx="2" fill="#059669" />
      
      <circle cx="100" cy="140" r="15" fill="#8b5cf6" />
      <circle cx="100" cy="135" r="8" fill="#a78bfa" />
      <rect x="96" y="145" width="8" height="10" rx="2" fill="#7c3aed" />
      
      <circle cx="140" cy="130" r="15" fill="#f59e0b" />
      <circle cx="140" cy="125" r="8" fill="#fbbf24" />
      <rect x="136" y="135" width="8" height="10" rx="2" fill="#d97706" />
      
      {/* Control panel */}
      <rect x="40" y="175" width="120" height="35" rx="4" fill="#111827" />
      <circle cx="70" cy="192" r="10" fill="#ef4444" />
      <rect x="90" y="182" width="60" height="20" rx="2" fill="#1f2937" />
      
      {/* Joystick */}
      <circle cx="70" cy="192" r="6" fill="#dc2626" />
      <ellipse cx="70" cy="188" rx="4" ry="2" fill="#fca5a5" opacity="0.5" />
      
      {/* Prize chute */}
      <rect x="70" y="220" width="60" height="20" rx="4" fill="#111827" />
      <rect x="75" y="225" width="50" height="10" rx="2" fill="#1f2937" />
      
      {/* Decorative lights */}
      <circle cx="40" cy="35" r="4" fill="#10b981" className="animate-pulse" />
      <circle cx="60" cy="35" r="4" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
      <circle cx="80" cy="35" r="4" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
      <circle cx="100" cy="35" r="4" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
      <circle cx="120" cy="35" r="4" fill="#10b981" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
      <circle cx="140" cy="35" r="4" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '1s' }} />
      <circle cx="160" cy="35" r="4" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
    </svg>
  );
}
