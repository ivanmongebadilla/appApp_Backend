import { Router, json } from "express";
import { editUserValidation, logInValidation, userValidation } from "../middlewares/schemavalidations.js";
import {getUser, editUser, getUsers, getUserByParamId} from '../controllers/usercontrollers.js';
import { forgotPassword, logInFunction, signUpFunction } from "../controllers/authenticationcontrollers.js";
import { protectMiddleware, authorizationMiddleware } from "../middlewares/protect.js";


export const userRouter = Router();

// TODO we can validate the ID here so we dont have to repeat code in the controller
// TODO can even move the function to the controller file 
// userRouter.param('id', (req, res, next, val) => {
//     console.log(`User id is: ${val}`)
// })

//TODO use route and chain actions .route('').get().post()...

userRouter.get('/', protectMiddleware, authorizationMiddleware('admin'), getUsers);

userRouter.get('/:id', protectMiddleware, authorizationMiddleware('admin'), getUserByParamId);

userRouter.post('/signup', userValidation, signUpFunction);

userRouter.post('/login', logInValidation, logInFunction);

//TODO add validation middleware
userRouter.post('/forgotPassword', forgotPassword)

//TODO add validation middleware
userRouter.post('/resetPassword', (req, res) => {
    res.send("Success")
})

userRouter.patch('/:id', editUserValidation, protectMiddleware, authorizationMiddleware('admin'), editUser);
