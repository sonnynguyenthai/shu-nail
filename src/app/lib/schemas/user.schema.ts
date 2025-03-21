import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(8, "Name must be at least 8 characters"),
    email: z.string().regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email"
    ),
    phone: z.string().regex(/^\d{10,}$/, "Phone number must be at least 10 digits").optional(),
    imageUrl: z.string().min(1, "Image is required"),
});

export type UserFormValues = z.infer<typeof userSchema>;