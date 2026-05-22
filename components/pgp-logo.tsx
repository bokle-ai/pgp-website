import Image from "next/image";

interface PGPLogoProps {
  variant?: "horizontal" | "stacked" | "icon" | "full";
  className?: string;
  darkMode?: boolean;
  /** Pixel size of the icon crop (height). Width auto-scales with the same ratio. Only used for variant="icon". */
  size?: number;
  /** Height in pixels for the full-lockup variant. Defaults to 96. */
  height?: number;
}

// Natural logo dimensions: 1080 × 1350 (portrait, ratio = 0.8)
// Icon/emblem occupies roughly the top 42% (y 0–567 px of original).
// To show only the emblem in a 52 × 58 px clip:
//   render image at width=110px (height auto = 137.5px),
//   center horizontally, clip to top 58px → shows y 0–568 of original ✓

export function PGPLogo({ variant = "horizontal", className = "", darkMode = false, size, height }: PGPLogoProps) {
  /* ── Full-lockup variant — shows the entire PNG (emblem + wordmark) without cropping,
       sized by height. This is what we use in the nav now. */
  if (variant === "full") {
    const h = height ?? 96;
    // Original image ratio: 1080 × 1350 = 0.8 (portrait)
    const w = Math.round(h * (1080 / 1350));
    return (
      <div
        className={className}
        aria-label="Prime Golden Properties"
        style={{ width: w, height: h, transition: "width 0.3s ease, height 0.3s ease" }}
      >
        <Image
          src="/logo.png"
          alt="Prime Golden Properties"
          width={1080}
          height={1350}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  }

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
    // Reference: at height 58 the image is rendered at width 110 (ratio 1.897)
    const h = size ?? 58;
    const w = Math.round(h * (52 / 58));            // crop box width (ratio 52:58)
    const imgWidth = Math.round(h * (110 / 58));     // displayed image width
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        aria-label="Prime Golden Properties"
        style={{ width: w, height: h, transition: "width 0.3s ease, height 0.3s ease" }}
      >
        <Image
          src="/logo.png"
          alt="Prime Golden Properties"
          width={1080}
          height={1350}
          priority
          style={{
            position: "absolute",
            width: `${imgWidth}px`,
            height: "auto",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            transition: "width 0.3s ease",
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
