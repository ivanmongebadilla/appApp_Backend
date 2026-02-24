import { userSchema } from "../models/userModel.js"

export const userValidation = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(422).json({
        error: 'Validation failed',
        details: result.error
        });
     }

    req.validatedData = result.data;
    next();
}