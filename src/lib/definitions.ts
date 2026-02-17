
import { z } from 'zod';

export const OrderSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, { message: "Please enter a valid phone number." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters long." }),
  workType: z.enum(["gate", "grill", "railing", "shutter-repair", "home-work"], {
    errorMap: () => ({ message: "Please select a work type." }),
  }),
  length: z.coerce.number().positive({ message: "Length must be a positive number." }),
  width: z.coerce.number().positive({ message: "Width must be a positive number." }),
  height: z.coerce.number().positive({ message: "Height must be a positive number." }),
});

export type OrderFormValues = z.infer<typeof OrderSchema>;
