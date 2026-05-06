interface PGPLogoProps {
  variant?: "horizontal" | "stacked";
  className?: string;
  darkMode?: boolean;
}

export function PGPLogo({ variant = "horizontal", className = "", darkMode = false }: PGPLogoProps) {
  const goldColor = "#C9A24B";
  const textColor = darkMode ? "#F6F1E7" : "#14201A";

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-1 ${className}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="48" height="48" rx="4" fill="#0E2B22" />
          <text x="24" y="32" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="600" fill={goldColor}>PGP</text>
        </svg>
        <span style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontWeight: 600, fontSize: "0.875rem", color: textColor, letterSpacing: "-0.01em" }}>
          Prime Golden Properties
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`} aria-label="Prime Golden Properties">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="36" height="36" rx="4" fill="#0E2B22" />
        <text x="18" y="25" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontWeight="600" fill={goldColor}>PGP</text>
      </svg>
      <div className="flex flex-col leading-tight">
        <span
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontWeight: 600,
            fontSize: "1.0625rem",
            color: textColor,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          Prime Golden
        </span>
        <span
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontWeight: 600,
            fontSize: "1.0625rem",
            color: textColor,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          Properties
        </span>
      </div>
    </div>
  );
}
