import { z } from 'zod';

export const positionSchema = z.object({
    company: z.string(),
    position: z.string(),
    employment_type: z.enum(["full_time", "part_time", "contract", "temporary", "intern"]),
    work_mode: z.enum(["remote", "on_site", "hybrid"]),
    link: z.string().url(),
    salary: z.object({
        min: z.number().nonnegative().optional(),
        max: z.number().nonnegative().optional(),
        currency: z.string().optional()
    }).optional(),
    status: z.enum(["applied", "interviewing", "offered", "rejected", "saved", "archived", "withdrawn"]),
    priority: z.enum(["high", "medium", "low"]),
    note: z.string().optional(),
    applied_date: z.string().date(),
    location: z.object({
        country: z.string(),
        state: z.string(),
        city: z.string()
    })
})

// export const editPositionSchema = positionSchema.partial();
export const editPositionSchema = z.object({
    // Added everything just to have more control in case i want to change something
    //TODO Removed optional for now until i find a way to update specific field and not the complete resource 
    company: z.string(),
    position: z.string(),
    employment_type: z.enum(["full_time", "part_time", "contract", "temporary", "intern"]),
    work_mode: z.enum(["remote", "on_site", "hybrid"]),
    link: z.string().url(),
    salary: z.object({
        min: z.number().nonnegative().optional(),
        max: z.number().nonnegative().optional(),
        currency: z.string().optional()
    }).optional(),
    status: z.enum(["applied", "interviewing", "offered", "rejected", "saved", "archived", "withdrawn"]),
    priority: z.enum(["high", "medium", "low"]),
    note: z.string().optional(),
    applied_date: z.string().date(),
    location: z.object({
        country: z.string(),
        state: z.string(),
        city: z.string()
    })
}).strict()