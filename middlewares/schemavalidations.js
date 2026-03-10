import { editUserSchema, forgotPasswordSchema, logInSchema, resetPasswordSchema, userSchema } from "../models/userModel.js"
import { editPositionSchema, positionSchema } from "../models/postionModel.js";
import { queryApplicationSchema } from "../models/queryModel.js";
import { AppError } from "../utils/apperror.js";

export const userValidation = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return next(new AppError(result.error, 422));
     }

    req.body = result.data;
    next();
}

export const editUserValidation = (req, res, next) => {
    const result = editUserSchema.safeParse(req.body);
    if (!result.success){
        return next(new AppError(result.error, 422))
    }
    req.body = result.data;
    next();
}

export const logInValidation = (req, res, next) => {
    const result = logInSchema.safeParse(req.body);
    if (!result.success){
        return next(new AppError(result.error, 422))
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

export const editPositionValidation = (req, res, next) => {
    const result = editPositionSchema.safeParse(req.body);
    if (!result.success){
        return next(new AppError(result.error, 422));
    }
    req.body = result.data;
    next();
}

export const queryApplicationValidation = (req, res, next) => {
    if (req.query) {
        console.log('Query: ', req.query)
        const result = queryApplicationSchema.safeParse(req.query)
        console.log('Query Validation: ', result)
        if (!result.success){return next(new AppError(result.error, 422))}
    }
    next();     
}

export const forgotPasswordValidation = (req, res, next) => {
    const result = forgotPasswordSchema.safeParse(req.body)
    if (!result.success) {return next(new AppError(result.error, 422))}
    
    req.body = result.data
    next()
}

export const resetPasswordValidation = (req, res, next) => {
    const result = resetPasswordSchema.safeParse(req.body)
    if (!result.success){return next(new AppError(result.error, 422))}

    req.body = result.data
    next()
}