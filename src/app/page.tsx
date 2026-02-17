import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-4 animate-fade-in">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader className="items-center">
          <Logo className="w-24 h-24 mb-4 text-primary" />
          <CardTitle className="text-4xl font-extrabold tracking-tight font-headline">
            WeldOrder
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Your trusted partner for custom welding jobs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-8">
            Need a new gate, grill, or a custom metal piece? Place your order online in minutes and we'll get in touch with a quote.
          </p>
          <Link href="/order" passHref>
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold">
              Place Order
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
