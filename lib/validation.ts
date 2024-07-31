import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
    .min(2, "Name must be at least 2 characters."),
    // .max(35, "Name must be at most 35 characters."),
    email: z.string().email('Valid email address'),
    phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), 'Invalid phone number')

    })
  