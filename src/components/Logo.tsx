import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-primary', className)}
    >
      <title>Rajjab Welds Logo</title>
      {/* Sparks */}
      <path d="M7 12h10" />
      <path d="m13.5 6-3 12" />
      <path d="m10.5 6-3 12" />
      {/* Welder Mask Outline */}
      <path d="M4 12A8 8 0 0 1 12 4a8 8 0 0 1 8 8c0 2.5-1.2 4.7-3 6" />
      <path d="M5 18H3" />
      <path d="M19 18h2" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
    </svg>
  );
}
