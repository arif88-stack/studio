
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GalleryPage() {
  return (
    <main className="container mx-auto max-w-5xl py-8 px-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
          <CardDescription>A showcase of our recent work.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">Our photo gallery is coming soon. Please check back later!</p>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
