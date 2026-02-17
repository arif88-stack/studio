import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-4 animate-fade-in">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader className="items-center">
          <Logo className="w-24 h-24 mb-4 text-primary" />
          <CardTitle className="text-4xl font-extrabold tracking-tight font-headline">
            Welcome to Rajjab Welds
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Your trusted partner for custom welding jobs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-8">
            We specialize in gates, grills, railings, and other custom metal work.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
