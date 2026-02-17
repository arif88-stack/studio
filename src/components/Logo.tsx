import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  const logoImage = PlaceHolderImages.find(img => img.id === 'welding-mask-logo');

  if (!logoImage) {
    return null;
  }

  return (
    <div className={cn('relative overflow-hidden rounded-full', className)}>
      <Image
        src={logoImage.imageUrl}
        alt={logoImage.description}
        fill
        sizes="(max-width: 768px) 50vw, 100px"
        className="object-cover"
        priority
        data-ai-hint={logoImage.imageHint}
      />
    </div>
  );
}
