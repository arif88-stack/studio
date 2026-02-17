
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
  images: z.any()
    .refine((files): files is File[] => files?.length === 2, "Exactly 2 images are required.")
    .refine((files: File[]) => files.every((file) => file?.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(
      (files: File[]) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export type OrderFormValues = z.infer<typeof OrderSchema>;

export type OrderFormState = {
  errors?: {
    name?: string[];
    phone?: string[];
    address?: string[];
    workType?: string[];
    length?: string[];
    width?: string[];
    height?: string[];
    images?: string[];
  };
  message?: string | null;
} | undefined;
