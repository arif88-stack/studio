import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-4 animate-fade-in">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="items-center">
          <CheckCircle2 className="w-20 h-20 mb-4 text-green-500" />
          <CardTitle className="text-3xl font-bold">Order Sent Successfully!</CardTitle>
          <CardDescription className="pt-2 text-base">
            Thank you for your order. We will review the details and contact you soon with a quote.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/" passHref>
            <Button size="lg" className="w-full">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
