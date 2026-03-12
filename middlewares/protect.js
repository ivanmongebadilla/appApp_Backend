import { AppError } from "../utils/apperror.js";
import { catchAsync } from "../utils/catchasync.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { getUserByEmailorId } from "../repositories/userrepositories.js"

export const protectMiddleware = catchAsync(async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    
    // 1) Get the token from the request
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        next(new AppError('You are not logged in', 401))
    }
    
    // 2) Verificate the token
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET)
    
    // 3) Check if user still exists
    const data = await getUserByEmailorId(null, decoded.id)

    // 4) Check if user changes password after the token was issued
    //TODO need to set up User with a password_change_at so we can compare this date and time with decoded.iat (Protecting Routes - Part 2)

    req.user = data
    next()
})

//Indicate what role has authorization when using this middleware
export const authorizationMiddleware = (...roles) => { 
    //roles is array ['user', 'other' ...]     
    return (req, res, next) => {
        //Can use req.user only on endpoints where we have used protectMiddleware before this authorizationMiddleware
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        
        next()
    }
}