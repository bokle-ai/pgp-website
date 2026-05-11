interface PGPLogoProps {
  variant?: "horizontal" | "stacked" | "icon";
  className?: string;
  darkMode?: boolean;
}

export function PGPLogo({ variant = "horizontal", className = "", darkMode = false }: PGPLogoProps) {
  const gold = "#D4A017";
  const goldLight = "#F2C75C";
  const green = "#0F3D2E";
  const greenMid = "#163F30";
  const textPrimary = darkMode ? "#F8F5EF" : "#0F3D2E";

  /* ── Brand mark: location pin above 4-diamond plot grid ── */
  const BrandMark = ({ size = 56 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Location pin ── */}
      {/* Pin body (teardrop) */}
      <path
        d="M50 8C40.6 8 33 15.6 33 25C33 37.5 50 55 50 55C50 55 67 37.5 67 25C67 15.6 59.4 8 50 8Z"
        fill="url(#goldGrad)"
      />
      {/* Pin inner circle (white cutout) */}
      <circle cx="50" cy="25" r="8" fill="white" />

      {/* ── 4 diamond plot shapes below pin ── */}
      {/* Back-left diamond (green) */}
      <path d="M27 62 L40 55 L50 62 L37 69 Z" fill={greenMid} />
      {/* Back-right diamond (gold) */}
      <path d="M50 62 L63 55 L73 62 L60 69 Z" fill="url(#goldGrad)" />
      {/* Front-left diamond (gold) */}
      <path d="M27 62 L37 69 L27 76 L17 69 Z" fill="url(#goldGradLight)" />
      {/* Front-right diamond (green) */}
      <path d="M60 69 L73 62 L83 69 L70 76 Z" fill={green} />

      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={goldLight} />
          <stop offset="100%" stopColor={gold} />
        </linearGradient>
        <linearGradient id="goldGradLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={goldLight} />
          <stop offset="100%" stopColor="#E8B830" />
        </linearGradient>
      </defs>
    </svg>
  );

  /* ── Icon / app variant ── */
  if (variant === "icon") {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl ${className}`}
        style={{ backgroundColor: green, width: 64, height: 64 }}
      >
        <BrandMark size={48} />
      </div>
    );
  }

  /* ── Stacked variant ── */
  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`} aria-label="Prime Golden Properties">
        <BrandMark size={72} />
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1.5">
            <span
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontWeight: 700,
                fontSize: "1.5rem",
                letterSpacing: "0.02em",
                lineHeight: 1,
                color: gold,
              }}
            >
              PRIME
            </span>
            <span
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontWeight: 700,
                fontSize: "1.5rem",
                letterSpacing: "0.02em",
                lineHeight: 1,
                color: gold,
              }}
            >
              GOLDEN
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ width: 20, height: 1, backgroundColor: gold, display: "inline-block" }} aria-hidden="true" />
            <span
              style={{
                fontFamily: "var(--font-montserrat, sans-serif)",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                color: textPrimary,
              }}
            >
              PROPERTIES
            </span>
            <span style={{ width: 20, height: 1, backgroundColor: gold, display: "inline-block" }} aria-hidden="true" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "0.7rem",
              color: darkMode ? "rgba(248,245,239,0.6)" : "var(--ink-muted)",
              marginTop: 2,
            }}
          >
            Right Location. Right Decision.
          </span>
        </div>
      </div>
    );
  }

  /* ── Horizontal variant (default — used in nav) ── */
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Prime Golden Properties">
      <BrandMark size={44} />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <span
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              color: gold,
            }}
          >
            PRIME
          </span>
          <span
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              color: gold,
            }}
          >
            GOLDEN
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span style={{ width: 12, height: "1px", backgroundColor: gold, display: "inline-block" }} aria-hidden="true" />
          <span
            style={{
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontWeight: 600,
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              color: textPrimary,
            }}
          >
            PROPERTIES
          </span>
          <span style={{ width: 12, height: "1px", backgroundColor: gold, display: "inline-block" }} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
