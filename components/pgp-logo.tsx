import Image from "next/image";

interface PGPLogoProps {
  /** "horizontal" = full lockup (emblem + wordmark). "icon" = emblem only. */
  variant?: "horizontal" | "full" | "stacked" | "icon";
  className?: string;
  /** Use the cream/light monochrome version for dark backgrounds. */
  darkMode?: boolean;
  /** Height in pixels. Width auto-scales to the asset's natural ratio. */
  height?: number;
  /** Alias for height, kept for the icon variant. */
  size?: number;
}

// New brand assets (transparent PNGs, tightly trimmed):
//   logo-h.png        1528 × 339 , full horizontal lockup (colour)
//   logo-h-light.png  1528 × 339 , cream monochrome, for dark backgrounds
//   logo-icon.png      403 × 339 , emblem only (colour)
//   logo-icon-light.png 403 × 339, emblem, cream monochrome
const H_RATIO = 1528 / 339; // ≈ 4.507
const ICON_RATIO = 403 / 339; // ≈ 1.189

export function PGPLogo({
  variant = "horizontal",
  className = "",
  darkMode = false,
  height,
  size,
}: PGPLogoProps) {
  /* ── Emblem-only ── */
  if (variant === "icon") {
    const h = size ?? height ?? 40;
    const w = Math.round(h * ICON_RATIO);
    const src = darkMode ? "/logo-icon-light.png" : "/logo-icon.png";
    return (
      <Image
        src={src}
        alt="Prime Golden Properties"
        width={403}
        height={339}
        priority
        className={className}
        style={{ width: w, height: h, objectFit: "contain", display: "block" }}
      />
    );
  }

  /* ── Full horizontal lockup (default, also used for "full"/"stacked") ── */
  const h = height ?? 48;
  const w = Math.round(h * H_RATIO);
  const src = darkMode ? "/logo-h-light.png" : "/logo-h.png";
  return (
    <Image
      src={src}
      alt="Prime Golden Properties, Right Location. Right Decision."
      width={1528}
      height={339}
      priority
      className={className}
      style={{
        width: w,
        height: h,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}
