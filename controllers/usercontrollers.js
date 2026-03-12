import { catchAsync } from "../utils/catchasync.js";
import { editUserByEmailorId, getAllUsers, deleteUserById, getUserByEmailorId } from "../repositories/userrepositories.js";
import { correctPassword } from "../utils/utils.js";
import { AppError } from "../utils/apperror.js";

export const getUser = catchAsync(async (req, res, next) => {
    const data = await getUserById(req.user.id)

    return res.status(201).json({status: "success", data})
})

// This is for Admin user
export const getUsers = catchAsync(async (req, res, next) => {
    const data = await getAllUsers()

    return res.status(201).json({status: "success", data})
})

// This is for Admin user
export const getUserByParamId = catchAsync(async (req, res, next) => {
    //const data = await getUserById(req.params.id)
    const data = await getUserByEmailorId(null, req.params.id)

    return res.status(201).json({status: "success", data})
})

// This is for Admin user
export const editUser = catchAsync(async(req,res,next) =>{
    const data = await editUserByEmailorId(null, req.params.id, req.body)

    return res.status(200).json({status: "success", message: "User edited successfully", data});
})

//This is for normal user
export const updateMe = catchAsync(async (req, res, next) => {
    const data = await editUserByEmailorId(null, req.user.id, req.body)

    return res.status(200).json({status: "success", message: "User edited successfully", data});
})

export const deleteUser = catchAsync(async (req, res, next) => {
    // TODO set user to inacgive instead??
    // TODO should i remove the applications for this user??
    
    //Check password is in the req.body
    const { password } = req.body

    if (!password) {
        return next(new AppError('Please provide password', 404))
    }

    // Check password match
    const correct = correctPassword(req.body.password, req.user.password)

    if(!correct){
        return next(new AppError('Incorrect password', 401))
    } 

    const data = await deleteUserById(req.user.id)

    res.status(200).json({status: 'success', message: 'User deleted successfully'})
})