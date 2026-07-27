import { useState } from "react";

interface GargantuaLogoProps {
  className?: string;
  size?: number;
}

export default function GargantuaLogo({ className = "", size = 48 }: GargantuaLogoProps) {
  const [loadFailed, setLoadFailed] = useState(false);

  if (loadFailed) {
    return (
      <div 
        className={`relative flex items-center justify-center select-none ${className}`} 
        style={{ width: size, height: size }}
      >
        {/* Einstein Lensing Ring 1 */}
        <div className="absolute inset-0 border border-brand-gold/30 rounded-full animate-[spin_12s_linear_infinite]" />
        
        {/* Einstein Lensing Ring 2 - Opposing rotation */}
        <div 
          className="absolute border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"
          style={{ inset: "12%" }}
        />

        {/* Accretion Disk Warp */}
        <div 
          className="absolute bg-gradient-to-r from-brand-gold/5 via-brand-gold/40 to-brand-gold/5 blur-[2px] rounded-full animate-pulse"
          style={{ 
            width: "125%", 
            height: "15%", 
            transform: "rotate(-15deg)" 
          }} 
        />
        
        {/* Gravitational Lens Glow */}
        <div 
          className="absolute bg-brand-gold/15 rounded-full blur-md"
          style={{ inset: "15%" }}
        />

        {/* The Event Horizon (Singularity Center) */}
        <div 
          className="absolute bg-brand-black rounded-full border border-brand-gold shadow-[0_0_15px_rgba(226,177,60,0.6)]"
          style={{ inset: "25%" }}
        />

        {/* Core Center Dot */}
        <div 
          className="absolute bg-white rounded-full opacity-80"
          style={{ width: "3%", height: "3%" }}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="/Gold_BLACKFRAME_labs_logo.png"
        alt="Blackframe Labs Logo"
        onError={() => setLoadFailed(true)}
        className="object-contain h-10 w-auto"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
