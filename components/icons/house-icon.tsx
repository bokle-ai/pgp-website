export function HouseIcon({ className }: { className?: string }) {
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
      <path
        d="M6 22L24 6L42 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18V42H38V18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="19" y="30" width="10" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="13" y="24" width="7" height="7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="28" y="24" width="7" height="7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="24" y1="6" x2="24" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
