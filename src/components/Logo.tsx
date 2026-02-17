import { cn } from "@/lib/utils";
import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { PlaceHolderImages } from "@/lib/placeholder-images";

const logoImage = PlaceHolderImages.find(img => img.id === 'gallery-welding');
// Use the URL from the JSON file, with a safe fallback.
const logoUrl = logoImage?.imageUrl ?? '';

/**
 * Renders the Rajjab Welds logo using a high-quality welder image.
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
        // Fallback in case the image URL can't be found for some reason.
        <div className="w-full h-full bg-gray-300" />
      )}
    </div>
  );
}
