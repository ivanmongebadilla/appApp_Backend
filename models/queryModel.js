import { z } from 'zod';

export const queryApplicationSchema = z.object({
    company: z.string().optional(),
    position: z.string().optional(),
    country: z.string().optional(),
    applied_date: z.date().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    work_mode: z.string().optional(),
    currency: z.string().optional(),
    priority: z.string().optional(),
    employment_type: z.string().optional(),
    status: z.string().optional()
}).strict()