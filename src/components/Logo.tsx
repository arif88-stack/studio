import { cn } from "@/lib/utils";
import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { PlaceHolderImages } from "@/lib/placeholder-images";

// Use the first image in the placeholder list as the logo.
const logoImage = PlaceHolderImages[0]; 
const logoUrl = logoImage?.imageUrl ?? '';

/**
 * Renders the Rajjab Welds logo using a simple image.
 * Uses Next.js Image for optimization and is styled as a circle.
 */
export default function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn("relative overflow-hidden rounded-full bg-muted", props.className)}>
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt="Rajjab Welds Logo"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      ) : (
        <div className="w-full h-full bg-gray-300" />
      )}
    </div>
  );
}
