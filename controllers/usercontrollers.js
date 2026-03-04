import { supabase } from "../supabase/supabase.js";
import { hashPassword } from "../utils/utils.js";
import { AppError } from "../utils/apperror.js";
import { catchAsync } from "../utils/catchasync.js";

export const editUser = catchAsync(async(req,res,next) =>{
    const { data, error } = await supabase
    .from('Users')
    .update({
       email: req.body.email,
       firstname: req.body.firstName,
       lastname: req.body.lastName,
       role: req.body.role,
       country: req.body.location.country,
       state: req.body.location.state,
       city: req.body.location.city 
    })
    .match({id: req.params.id})
    .select()
    .single();

    console.log(data, error)
    if(error && error.code != "") {
        return next(new AppError(error.message, 404))
    } else if (error && !error.code) {
        return next(new AppError(error.message, 500))
    }
    return res.status(200).json({status: "success", message: "User edited successfully", data});
})