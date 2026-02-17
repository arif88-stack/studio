import Image from 'next/image';
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { HTMLAttributes } from 'react';

const weldingImage = PlaceHolderImages.find(img => img.id === 'gallery-welding');
// Using a high-quality image of a welder already present in the project's image list.
const logoUrl = weldingImage?.imageUrl ?? "https://images.unsplash.com/photo-1533013239385-c40590a16b48?w=500";

/**
 * Renders a circular, responsive logo using a photographic image of a welder.
 */
export default function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn("relative aspect-square overflow-hidden rounded-full", props.className)}>
        <Image
          src={logoUrl}
          alt="Rajjab Welds Logo showing a person welding"
          fill
          className="object-cover"
        />
    </div>
  );
}
