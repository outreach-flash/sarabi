export function RitualMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="31" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 4" />
      <path d="M40 4L44.5 32.5L68 12L48 36L76 40L48 44L68 68L44.5 47.5L40 76L35.5 47.5L12 68L32 44L4 40L32 36L12 12L35.5 32.5L40 4Z" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="40" cy="40" r="3" fill="currentColor" />
    </svg>
  )
}
