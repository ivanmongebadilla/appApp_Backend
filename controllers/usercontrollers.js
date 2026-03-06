import { catchAsync } from "../utils/catchasync.js";
import { editUserById, getUserById } from "../repositories/userrepositories.js";

export const getUser = catchAsync(async (req, res, next) => {
    const data = await getUserById(req.user.id)

    return res.status(201).json({status: "success", data})
})

export const editUser = catchAsync(async(req,res,next) =>{
    const data = await editUserById(req.body, req.params.id)

    return res.status(200).json({status: "success", message: "User edited successfully", data});
})

export const updateMe = catchAsync(async (req, res, next) => {
    const data = await editUserById(req.body, req.user.id)

    return res.status(200).json({status: "success", message: "User edited successfully", data});
})