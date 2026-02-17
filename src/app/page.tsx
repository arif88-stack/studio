import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-4 animate-fade-in">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl font-extrabold tracking-tight font-headline pt-8">
            Welcome to Rajjab Welds
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Your trusted partner for custom welding jobs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            We specialize in gates, grills, railings, and other custom metal work.
          </p>
          <Link href="/order" passHref>
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Place an Order
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
