import Image from "next/image";

interface PGPLogoProps {
  variant?: "horizontal" | "stacked" | "icon";
  className?: string;
  darkMode?: boolean;
}

// Natural logo dimensions: 1080 × 1350 (portrait, ratio = 0.8)
// Icon/emblem occupies roughly the top 42% (y 0–567 px of original).
// To show only the emblem in a 52 × 58 px clip:
//   render image at width=110px (height auto = 137.5px),
//   center horizontally, clip to top 58px → shows y 0–568 of original ✓

export function PGPLogo({ variant = "horizontal", className = "", darkMode = false }: PGPLogoProps) {
  /* ── Stacked / full-lockup variant (footer, print) ── */
  if (variant === "stacked") {
    return (
      <div className={`flex justify-center ${className}`} aria-label="Prime Golden Properties">
        <Image
          src="/logo.png"
          alt="Prime Golden Properties — Right Location. Right Decision."
          width={220}
          height={275}
          className="object-contain"
          style={darkMode ? { filter: "brightness(0) invert(1)" } : {}}
        />
      </div>
    );
  }

  /* ── Icon-only variant ── */
  if (variant === "icon") {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        aria-label="Prime Golden Properties"
        style={{ width: 52, height: 58 }}
      >
        <Image
          src="/logo.png"
          alt="Prime Golden Properties"
          width={1080}
          height={1350}
          style={{
            position: "absolute",
            width: "110px",
            height: "auto",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
          }}
        />
      </div>
    );
  }

  /* ── Horizontal / nav variant ──
     Shows the emblem (cropped PNG) + wordmark in brand fonts side-by-side.
     This gives a properly readable nav logo regardless of screen density. ── */
  return (
    <div className={`flex items-center gap-2.5 ${className}`} aria-label="Prime Golden Properties">
      {/* Emblem — clipped to icon area only */}
      <div
        style={{
          position: "relative",
          width: 52,
          height: 58,
          overflow: "hidden",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <Image
          src="/logo.png"
          alt=""
          width={1080}
          height={1350}
          priority
          style={{
            position: "absolute",
            width: "110px",
            height: "auto",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
          }}
        />
      </div>

      {/* Wordmark */}
      <div style={{ lineHeight: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 700,
            fontSize: "1.05rem",
            color: darkMode ? "var(--bg-cream)" : "var(--bg-deep)",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          Prime Golden
        </div>
        <div
          style={{
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 600,
            fontSize: "0.5rem",
            color: "var(--accent-gold)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            lineHeight: 1.6,
          }}
        >
          Properties
        </div>
      </div>
    </div>
  );
}
