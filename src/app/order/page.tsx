
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, serverTimestamp } from 'firebase/firestore';

import { OrderSchema, type OrderFormValues } from '@/lib/definitions';
import { useFirebase, useUser, initiateAnonymousSignIn, addDocumentNonBlocking } from '@/firebase';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function OrderPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { auth, firestore } = useFirebase();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      workType: undefined,
      length: undefined,
      width: undefined,
      height: undefined,
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    if (!user || !firestore) {
      toast({
        title: "Submission Error",
        description: "Cannot place order. Please try again later.",
        variant: "destructive",
      });
      if (!user) initiateAnonymousSignIn(auth);
      return;
    }

    const ordersCollection = collection(firestore, 'orders');

    const orderData = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      weldingWorkType: data.workType,
      length: data.length,
      width: data.width,
      height: data.height,
      ownerUid: user.uid,
      customerId: user.uid,
      submissionDateTime: serverTimestamp(),
      status: 'Pending',
      photoIds: [],
    };

    addDocumentNonBlocking(ordersCollection, orderData);
    router.push('/order/success');
  };

  return (
    <main className="container mx-auto max-w-2xl py-8 px-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Place Your Order</CardTitle>
          <CardDescription>Fill out the form below to get a quote for your welding work.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input type="tel" placeholder="+1 234 567 890" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl><Textarea placeholder="123 Main St, Anytown, USA" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Welding Work</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a work type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="gate">Gate</SelectItem>
                        <SelectItem value="grill">Grill</SelectItem>
                        <SelectItem value="railing">Railing</SelectItem>
                        <SelectItem value="shutter-repair">Shutter Repair</SelectItem>
                        <SelectItem value="home-work">Home Work</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel>Size Details</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Length (ft)</FormLabel>
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 10" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Width (ft)</FormLabel>
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 5" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Height (ft)</FormLabel>
                        <FormControl><Input type="number" step="0.01" placeholder="e.g., 6" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg" disabled={form.formState.isSubmitting || isUserLoading}>
                {form.formState.isSubmitting || isUserLoading ? 'Submitting...' : 'Place Order'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
