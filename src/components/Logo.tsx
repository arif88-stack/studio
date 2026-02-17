import { cn } from "@/lib/utils";
import type { HTMLAttributes } from 'react';

/**
 * Renders a simple, circular SVG logo representing a welding spark.
 * This is a reliable component that does not depend on external images.
 */
export default function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn("flex items-center justify-center rounded-full bg-primary p-1", props.className)}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="hsl(var(--primary-foreground))" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-full h-full"
        >
            <title>Rajjab Welds Logo</title>
            <path d="M12 3v2.5M12 18.5v2.5M21 12h-2.5M5.5 12H3M18.36 5.64l-1.78 1.78M7.42 16.58l-1.78 1.78M18.36 18.36l-1.78-1.78M7.42 7.42l-1.78-1.78" />
        </svg>
    </div>
  );
}
