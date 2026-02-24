import { userSchema } from "../models/userModel.js"
import { positionSchema } from "../models/postionModel.js";

export const userValidation = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(422).json({
        error: 'Validation failed',
        details: result.error
        });
     }

    req.body = result.data;
    next();
}

export const positionValidation = (req, res, next) => {
    const result = positionSchema.safeParse(req.body);
    if (!result.success){
        return res.status(422).json({
            error: 'Position Validation failed',
            details: result.error
        })
    }
    req.body = result.data;
    next();
}