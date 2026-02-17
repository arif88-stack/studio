
'use server';

import { OrderSchema, type OrderFormState } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function createOrder(prevState: OrderFormState, formData: FormData): Promise<OrderFormState> {
  // Using `any` for images because FormData returns EntryValue[] which can be string | File
  const validatedFields = OrderSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    workType: formData.get('workType'),
    length: formData.get('length'),
    width: formData.get('width'),
    height: formData.get('height'),
    images: formData.getAll('images').filter(f => (f as File).size > 0),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create order. Please check the fields.',
    };
  }

  // Here you would typically process the data, e.g., save to a database,
  // upload files to a storage service like Firebase Storage, etc.
  // For this demo, we'll just log it to the console.
  console.log('Order received:', validatedFields.data);

  redirect('/order/success');
}
