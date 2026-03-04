import { supabase } from "../supabase/supabase.js";
import { hashPassword, correctPassword } from "../utils/utils.js";
import { AppError } from "../utils/apperror.js";
import { catchAsync } from "../utils/catchasync.js";
import jwt from 'jsonwebtoken';

const signToken = (id) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = process.env.JWT_EXPIRES_IN
    return jwt.sign({id}, JWT_SECRET, { expiresIn: JWT_EXPIRES});

}

export const signUpFunction = catchAsync(async (req, res, next) =>{
    const hashedPassword = await hashPassword(req.body.password);

    // const token = jwt.sign({id: })
    //Can only change to ADMIN role from the database as of now
    const { data, error } = await supabase
        .from('Users')
        .insert({
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            role: 'user',
            country: req.body.location.country,
            state: req.body.location.state,
            city: req.body.location.city
        })
        .select();

    console.log(data, error);
    if(error && error.code != "") {
        return next(new AppError(error.message, 409))
    } else if (error && !error.code) {
        return next(new AppError(error.message, 500))
    }

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
    //Check if user exist and password is correct
    const { data, error} = await supabase
    .from('Users')
    .select()
    .eq('email', email)
    .single()
    
    console.log(data,error)
    console.log(data.email)
    if(error && error.code != "") {
        return next(new AppError(error.message, 409))
    } else if (error && !error.code) {
        return next(new AppError(error.message, 500))
    } else if (!data.email) {
        return next(new AppError("Incorrect user email", 401))
    }

    const correct = await correctPassword(password, data.password);
    if(!correct){
        return next(new AppError('Incorrect password', 401))
    }

    //if correct send the token to the client
    const token = signToken(data.id);
    res.status(200).json({status: "success", token})
})