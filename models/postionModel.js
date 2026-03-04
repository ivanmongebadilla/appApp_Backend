import { z } from 'zod';

export const positionSchema = z.object({
    userid: z.number(), //TODO need to remove this I think
    companyName: z.string(),
    positionTitle: z.string(),
    employmentType: z.enum(["full_time", "part_time", "contract", "temporary", "intern"]),
    workMode: z.enum(["remote", "on_site", "hybrid"]),
    link: z.string().url(),
    salary: z.object({
        min: z.number().nonnegative().optional(),
        max: z.number().nonnegative().optional(),
        currency: z.string().optional()
    }).optional(),
    status: z.enum(["applied", "interviewing", "offered", "rejected", "saved", "archvied", "withdrawn"]),
    priority: z.enum(["high", "medium", "low"]),
    notes: z.string().optional(),
    appliedAt: z.string().date(),
    location: z.object({
        country: z.string(),
        state: z.string(),
        city: z.string()
    })
})

// export const editPositionSchema = positionSchema.partial();
export const editPositionSchema = z.object({
    // Added everything just to have more control in case i want to change something
    companyName: z.string().optional(),
    positionTitle: z.string().optional(),
    employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERN"]).optional(),
    workMode: z.enum(["REMOTE", "ON_SITE", "HYBRID"]).optional(),
    link: z.string().url().optional(),
    salary: z.object({
        min: z.number().nonnegative().optional(),
        max: z.number().nonnegative().optional(),
        currency: z.string().optional()
    }).optional(),
    status: z.enum(["APPLIED", "INTERVIEWING", "OFFERED", "REJECTED", "SAVED", "ARCHIVED", "WITHDRAWN"]).optional(),
    priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
    notes: z.string().optional(),
    appliedAt: z.string().date().optional(),
    location: z.object({
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional()
    }).optional()
})