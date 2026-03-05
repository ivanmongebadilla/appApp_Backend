import { supabase } from "../supabase/supabase.js";
import { hashPassword, correctPassword } from "../utils/utils.js";
import { AppError } from "../utils/apperror.js";
import { catchAsync } from "../utils/catchasync.js";
import { getUserByEmail, createUser } from "../repositories/userrepositories.js";
import jwt from 'jsonwebtoken';

const signToken = (id) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = process.env.JWT_EXPIRES_IN
    console.log('ID: ', id)
    return jwt.sign({id}, JWT_SECRET, { expiresIn: JWT_EXPIRES});

}

export const signUpFunction = catchAsync(async (req, res, next) =>{
    const hashedPassword = await hashPassword(req.body.password);

    const data = await createUser(req.body, hashedPassword)

    const token = signToken(data.id) 
    //TODO do not return password
    return res.status(201).json({status: "success", message: "User created successfully", token, data: {user: data}});
}); 

export const logInFunction = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    //Check if email and password exist
    if(!email || !password){
        return next(new AppError("Please provide email and password", 400))
    }

    const user = await getUserByEmail(email)

    const correct = await correctPassword(password, user.password);
    if(!correct){
        return next(new AppError('Incorrect password', 401))
    }

    //if correct send the token to the client
    const token = signToken(user.id);
    res.status(200).json({status: "success", token})
})

export const forgotPassword = (req, res, next) => {
    // 1) Gate user based on posted email

    // 2) Generate the random reset token

    // 3)
}