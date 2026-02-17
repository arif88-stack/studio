
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GalleryPage() {
  const image = PlaceHolderImages[0];

  return (
    <main className="container mx-auto max-w-2xl py-8 px-4 animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Our Work</CardTitle>
          <CardDescription>A simple example of our work.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          {image && (
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg shadow-md group transition-shadow hover:shadow-xl">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{image.description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
