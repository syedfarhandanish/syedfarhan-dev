/** SFD brand mark: three nested contour rings around a summit point. */
export default function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
      <path
        d="M16 3.5c6.4 0 12.5 4.6 12.5 11.6 0 7.6-6.1 13.4-12.9 13.4C9 28.5 3.5 23.3 3.5 16.4 3.5 9 9.3 3.5 16 3.5Z"
        stroke="currentColor"
        strokeOpacity=".35"
        strokeWidth="1.4"
      />
      <path
        d="M16.3 8.3c4.2 0 8 3.1 8 7.6 0 4.8-3.9 8.3-8.4 8.3-4.4 0-7.8-3.3-7.8-7.6 0-4.7 3.8-8.3 8.2-8.3Z"
        stroke="currentColor"
        strokeOpacity=".65"
        strokeWidth="1.4"
      />
      <path
        d="M16.6 12.6c2 0 3.7 1.5 3.7 3.5 0 2.2-1.8 3.8-3.9 3.8-2 0-3.5-1.5-3.5-3.5 0-2.1 1.7-3.8 3.7-3.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="16.5" cy="16.2" r="1.6" fill="var(--accent)" />
    </svg>
  );
}
