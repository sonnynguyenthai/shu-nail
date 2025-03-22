import { z } from 'zod';

export const categorySchema = z.object({
    name: z.string().min(8, "Name must be at least 8 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    serviceName: z.string().min(1, "Service Name is required"),

});

export type CategoryFormValues = z.infer<typeof categorySchema>;
