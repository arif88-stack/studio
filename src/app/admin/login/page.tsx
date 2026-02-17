
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useFirebase, initiateEmailSignIn } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUser } from '@/firebase/provider';
import { Label } from '@/components/ui/label';


const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const ADMIN_PIN = '19812008';

export default function AdminLoginPage() {
  const router = useRouter();
  const { auth } = useFirebase();
  const { user, isUserLoading } = useUser();
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    if (user && isPinVerified) {
      router.push('/admin/orders');
    }
  }, [user, isPinVerified, router]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handlePinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsPinVerified(true);
      setPinError('');
    } else {
      setPinError('Invalid PIN. Please try again.');
    }
  };

  const onEmailSubmit = (data: LoginFormValues) => {
    initiateEmailSignIn(auth, data.email, data.password);
  };

  if (isUserLoading || (user && isPinVerified)) {
    return (
        <main className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <p>Loading...</p>
        </main>
    );
  }

  return (
    <main className="container mx-auto max-w-sm py-8 px-4 animate-fade-in">
      <Card>
        {isPinVerified ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onEmailSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="admin@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
              <CardDescription>Enter the 8-digit PIN to proceed.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePinSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pin">PIN</Label>
                  <Input
                      id="pin"
                      type="password"
                      placeholder="********"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      maxLength={8}
                      autoComplete="off"
                  />
                  {pinError && <p className="text-sm font-medium text-destructive">{pinError}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Verify PIN
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </main>
  );
}
