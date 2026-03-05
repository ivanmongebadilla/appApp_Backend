import { supabase } from "../supabase/supabase.js";
import { hashPassword } from "../utils/utils.js";
import { AppError } from "../utils/apperror.js";
import { catchAsync } from "../utils/catchasync.js";
import { editUserById } from "../repositories/userrepositories.js";

export const editUser = catchAsync(async(req,res,next) =>{
    const data = await editUserById(req.body, req.params.id)

    return res.status(200).json({status: "success", message: "User edited successfully", data});
})