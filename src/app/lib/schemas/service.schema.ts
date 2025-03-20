import { z } from 'zod';

export const serviceSchema = z.object({
    name: z.string().min(8, "Name must be at least 8 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    price: z.number().min(1, "Price is required"),
    imageUrl: z.string().min(1, "Image is required"),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
