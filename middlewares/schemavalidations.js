import { userSchema } from "../models/userModel.js"
import { positionSchema } from "../models/postionModel.js";
import { AppError } from "../utils/apperror.js";

export const userValidation = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return next(new AppError(result.error, 422));
     }

    req.body = result.data;
    next();
}

export const positionValidation = (req, res, next) => {
    const result = positionSchema.safeParse(req.body);
    if (!result.success){
        return next(new AppError(result.error, 422));
    }
    req.body = result.data;
    next();
}