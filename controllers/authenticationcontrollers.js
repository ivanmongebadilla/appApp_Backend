import { supabase } from "../supabase/supabase.js";
import { hashPassword, correctPassword } from "../utils/utils.js";
import { AppError } from "../utils/apperror.js";
import { createPasswordResetToken } from "../utils/utils.js"
import { catchAsync } from "../utils/catchasync.js";
import { getUserByEmailorId, createUser, passwordResetByEmail, 
    getUserByPasswordResetToken, editPassword } from "../repositories/userrepositories.js";
import { sendEmail } from "../utils/email.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = process.env.JWT_EXPIRES_IN
    
    return jwt.sign({id}, JWT_SECRET, { expiresIn: JWT_EXPIRES});
}

export const signUpFunction = catchAsync(async (req, res, next) =>{
    const hashedPassword = await hashPassword(req.body.password);

    const data = await createUser(req.body, hashedPassword)

    const token = signToken(data.id) 

    return res.status(201).json({status: "success", message: "User created successfully", token, data: {user: data}});
}); 

export const logInFunction = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    //Check if email and password exist
    if(!email || !password){
        return next(new AppError("Please provide email and password", 400))
    }

    const user = await getUserByEmailorId(email, null)

    const correct = await correctPassword(password, user.password);
    if(!correct){
        return next(new AppError('Incorrect password', 401))
    }

    //if correct send the token to the client
    const token = signToken(user.id);
    res.status(200).json({status: "success", token})
})

export const forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Gate user based on posted email
    if (!req.body || !req.body.email){
        return next(new AppError('Please provide email', 404))
    }

    // 2) Generate the random reset token
    const resetPasswordData = createPasswordResetToken()
    const data = await passwordResetByEmail(resetPasswordData, req.body.email)

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetPasswordData.resetToken}` 

    await sendEmail(data, resetURL) //TODO if there is an error here we need to remove the reset token and the reset token expires from the database
    res.status(200).json({status: "success"})

    // 3)
})

export const resetPassword = catchAsync(async (req, res, next) => {
    // 1) get user based on the token
    const hashedToken = crypto.createHash('sha256')
                            .update(req.params.token)
                            .digest('hex')

    const user = await getUserByPasswordResetToken(hashedToken)

    // 2) if token has not expired, and there is user, set the new password
    if (!user) {
        return next (new AppError('Token is invalid or has expired', 400)) //TODO This is not really required since getUserByPasswordResetToken will trhow the error 
    }

    console.log('Body: ', req.body.password)
    const hashedPassword = await hashPassword(req.body.password);
    const data = await editPassword(user.id, hashedPassword)

    const token = signToken(user.id)

    // 4) Log the user in, send jwt 
    res.status(200).json({status: 'success', token})
})

export const updatePassword = catchAsync(async (req, res, next) => {
    const {currentPassword, newPassword} = req.body;

    //Check if current and new password exist
    if(!currentPassword || !newPassword){
        return next(new AppError("Please provide current and new password", 400))
    }
    // 1) Get user 
    const user = await getUserByEmailorId(req.user.email, null)

    // 2) Check if posted password ir correct
    const correct = await correctPassword(currentPassword, user.password);
    if(!correct){
        return next(new AppError('Incorrect password', 401))
    }

    // 3) Update password
    const hashedPassword = await hashPassword(newPassword)
    const data = await editPassword(user.id, hashedPassword)

    // 4) Send the new JWT

    const token = signToken(user.id)
    res.status(200).json({status: 'success', token})
})