export function RssIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <circle cx="5" cy="19" r="2.5" />
      <path d="M2.5 9.5v3.2A8.8 8.8 0 0 1 11.3 21.5h3.2A12 12 0 0 0 2.5 9.5z" />
      <path d="M2.5 2.5v3.2A15.8 15.8 0 0 1 18.3 21.5h3.2A19 19 0 0 0 2.5 2.5z" />
    </svg>
  );
}
