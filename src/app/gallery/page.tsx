
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GalleryPage() {
  return (
    <main className="container mx-auto max-w-5xl py-8 px-4 animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Gallery</CardTitle>
          <CardDescription>A showcase of our finest custom welding work.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PlaceHolderImages.map((image) => (
              <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-md group transition-shadow hover:shadow-xl">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
