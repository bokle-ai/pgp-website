import Image from "next/image";

interface PGPLogoProps {
  variant?: "horizontal" | "stacked" | "icon";
  className?: string;
  darkMode?: boolean;
}

// Natural logo dimensions: 1080 × 1350 (portrait, ratio = 0.8)

export function PGPLogo({ variant = "horizontal", className = "", darkMode = false }: PGPLogoProps) {
  /* ── Stacked / full-lockup variant (footer, mobile menu) ── */
  if (variant === "stacked") {
    return (
      <div className={`flex justify-center ${className}`} aria-label="Prime Golden Properties">
        <Image
          src="/logo.png"
          alt="Prime Golden Properties — Right Location. Right Decision."
          width={180}
          height={225}
          className="object-contain"
          style={darkMode ? { filter: "brightness(0) invert(1)" } : {}}
        />
      </div>
    );
  }

  /* ── Icon-only variant ── */
  if (variant === "icon") {
    return (
      <div className={`relative ${className}`} aria-label="Prime Golden Properties" style={{ width: 56, height: 56 }}>
        <Image
          src="/logo.png"
          alt="Prime Golden Properties"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  /* ── Horizontal / nav variant — full portrait logo, tall enough to read ── */
  return (
    <div className={`flex items-center ${className}`} aria-label="Prime Golden Properties">
      <Image
        src="/logo.png"
        alt="Prime Golden Properties — Right Location. Right Decision."
        width={1080}
        height={1350}
        priority
        style={{
          height: "64px",
          width: "auto",
        }}
      />
    </div>
  );
}
