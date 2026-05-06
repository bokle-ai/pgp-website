export function PlotIcon({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="17" height="17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="27" y="4" width="17" height="17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="4" y="27" width="17" height="17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="27" y="27" width="17" height="17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="22" y1="4" x2="26" y2="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="21" x2="26" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="27" x2="26" y2="27" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="44" x2="26" y2="44" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="22" x2="4" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="21" y1="22" x2="21" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="27" y1="22" x2="27" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="22" x2="44" y2="26" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
