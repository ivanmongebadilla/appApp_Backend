import { z } from 'zod';
const ROLES = ["admin", "user"]

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
    }),
    passwordResetToken: z.string().optional(),
    passwordResetExpires: z.date().optional()
})

export const editUserSchema = z.object({
    email: z.email().optional(), //TODO Add errors
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.enum(ROLES).optional(), //TODO create some restrictions for to change to ADMIN
    location: z.object({
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional()
    })
})

export const logInSchema = z.object({
    email: z.email(),
    password: z.string()
}).strict()

export const forgotPasswordSchema = z.object({
    email: z.email() // Can add min/max lenght or other validation in the future
}).strict()

export const resetPasswordSchema = z.object({
    // TODO add email as well mybe
    password: z.string() // Can add min/max lenght or other validation in the future
}).strict()
