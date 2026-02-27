import { supabase } from "../supabase/supabase.js";
import { hashPassword } from "../utils/utils.js";
import { AppError } from "../utils/apperror.js";
import { catchAsync } from "../utils/catchasync.js";

export const signUpFunction = catchAsync(async (req, res) =>{
    const hashedPassword = await hashPassword(req.body.password);
    const { data, error } = await supabase
        .from('Users')
        .insert({
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            role: req.body.role,
            country: req.body.location.country,
            state: req.body.location.state,
            city: req.body.location.city
    });

    console.log(data, error);
    if(error) {
        throw new AppError(error.message, 409)
    }
    return res.status(201).json({status: "success", message: "User created successfully"});
}); 