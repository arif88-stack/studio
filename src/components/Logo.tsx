import { cn } from "@/lib/utils";
import Image from 'next/image';
import type { HTMLAttributes } from 'react';

const logoUrl = 'https://images.unsplash.com/photo-1533013239385-c40590a16b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3ZWxkaW5nJTIwbWFza3xlbnwwfHx8fDE3MDk4MTE4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080';

/**
 * Renders the Rajjab Welds logo using a high-quality welder image.
 * Uses Next.js Image for optimization and is styled as a circle.
 */
export default function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn("relative overflow-hidden rounded-full bg-muted", props.className)}>
      <Image
        src={logoUrl}
        alt="Rajjab Welds Logo"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
}
