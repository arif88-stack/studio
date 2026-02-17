'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

import { OrderSchema, type OrderFormValues, type OrderFormState } from '@/lib/definitions';
import { createOrder } from '@/app/order/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, File as FileIcon, X } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg" disabled={pending}>
      {pending ? 'Submitting...' : 'Place Order'}
    </Button>
  );
}

const initialState: OrderFormState = undefined;

export default function OrderPage() {
  const [formState, formAction] = useFormState(createOrder, initialState);
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
      images: undefined,
    },
  });

  useEffect(() => {
    if (!formState) return;
    if (formState.errors) {
      toast({ title: "Submission Error", description: "Please correct the errors below.", variant: "destructive" });
    }
  }, [formState, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const combined = [...imagePreviews, ...newFiles].slice(0, 2);
      setImagePreviews(combined);
      form.setValue('images', combined, { shouldValidate: true });
    }
  };

  const removeFile = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    form.setValue('images', newPreviews.length > 0 ? newPreviews : undefined, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              ref={formRef}
              action={formAction}
              onSubmit={form.handleSubmit(() => formRef.current?.submit())}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage>{formState?.errors?.name}</FormMessage>
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
                    <FormMessage>{formState?.errors?.phone}</FormMessage>
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
                    <FormMessage>{formState?.errors?.address}</FormMessage>
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
                    <FormMessage>{formState?.errors?.workType}</FormMessage>
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
                        <FormMessage>{formState?.errors?.length}</FormMessage>
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
                        <FormMessage>{formState?.errors?.width}</FormMessage>
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
                        <FormMessage>{formState?.errors?.height}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Design Photos</FormLabel>
                    <FormControl>
                      <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input id="images" name="images" type="file" className="hidden" onChange={handleFileChange} multiple accept="image/png,image/jpeg,image/webp" ref={fileInputRef} disabled={imagePreviews.length >= 2} />
                      </label>
                    </FormControl>
                    <FormDescription>Exactly 2 images are required.</FormDescription>
                    <FormMessage>{formState?.errors?.images}</FormMessage>
                    {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {imagePreviews.map((file, index) => (
                          <div key={index} className="relative">
                            <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                            <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => removeFile(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <SubmitButton />
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
