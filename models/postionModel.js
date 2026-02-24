import { z } from 'zod';

export const positionSchema = z.object({
    companyName: z.string(),
    positionTitle: z.string(),
    employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERN"]),
    workMode: z.enum(["REMOTE", "ON_SITE", "HYBRID"]),
    link: z.string().url(),
    salary: z.object({
        min: z.number().nonnegative(),
        max: z.number().nonnegative(),
        currency: z.string()
    }).optional(),
    status: z.enum(["APPLIED", "INTERVIEWING", "OFFERED", "REJECTED", "SAVED", "ARCHIVED", "WITHDRAWN"]),
    priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
    notes: z.string().optional(),
    appliedAt: z.string().date(),
    location: z.object({
        country: z.string(),
        state: z.string(),
        city: z.string()
    })
})