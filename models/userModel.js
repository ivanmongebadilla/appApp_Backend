import { z } from 'zod';
const ROLES = ["ADMIN", "USER"]

export const userSchema = z.object({
    email: z.email(), // Add errors
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(ROLES),
    location: z.object({
        country: z.string(),
        state: z.string(),
        city: z.string()
    })
})