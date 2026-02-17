
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages;

  return (
    <main className="container mx-auto py-8 px-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline">
          Our Work
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A showcase of our custom welding and metal fabrication projects.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((image) => (
          <Card key={image.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group rounded-lg">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
              </div>
            </CardContent>
            <div className="p-4">
              <p className="text-sm font-medium text-center text-muted-foreground">{image.description}</p>
            </div>
          </Card>
        ))}
        {galleryImages.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground bg-card p-8 rounded-lg">
                <p>The gallery is currently empty.</p>
                <p className="text-sm">Check back soon to see examples of our work!</p>
            </div>
        )}
      </div>
    </main>
  );
}
