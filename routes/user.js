import { Router, json } from "express";
import { editUserValidation, logInValidation, userValidation, forgotPasswordValidation, resetPasswordValidation } from "../middlewares/schemavalidations.js";
import {getUser, editUser, getUsers, getUserByParamId} from '../controllers/usercontrollers.js';
import { forgotPassword, logInFunction, resetPassword, signUpFunction, updatePassword } from "../controllers/authenticationcontrollers.js";
import { protectMiddleware, authorizationMiddleware } from "../middlewares/protect.js";


export const userRouter = Router();

//Access only for Admin user
userRouter.get('/', protectMiddleware, authorizationMiddleware('admin'), getUsers);

//Access only for Admin user
userRouter.get('/:id', protectMiddleware, authorizationMiddleware('admin'), getUserByParamId);

// ****** Routes for user ******
userRouter.post('/signup', userValidation, signUpFunction);

userRouter.post('/login', logInValidation, logInFunction);

userRouter.post('/forgotPassword', forgotPasswordValidation, forgotPassword)

userRouter.patch('/resetPassword/:token', resetPasswordValidation, resetPassword)

userRouter.patch('/changePassword', protectMiddleware, updatePassword)
// ****** Routes for user ******

//Access only for Admin user
userRouter.patch('/:id', editUserValidation, protectMiddleware, authorizationMiddleware('admin'), editUser);
