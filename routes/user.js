import { Router, json } from "express";
import { editUserValidation, userValidation } from "../middlewares/schemavalidations.js";
import {editUser} from '../controllers/usercontrollers.js';
import { logInFunction, signUpFunction } from "../controllers/authenticationcontrollers.js";


export const userRouter = Router();

// TODO we can validate the ID here so we dont have to repeat code in the controller
// TODO can even move the function to the controller file 
// userRouter.param('id', (req, res, next, val) => {
//     console.log(`User id is: ${val}`)
// })

//TODO use route and chain actions .route('').get().post()...

// TODO update this endpoint with real function
userRouter.get('/', (req, res) => {
    // return res.json("Hello world");
    res.status(500).json({status: 'error', message: 'This route is not yet defined'});
});

// TODO update get function for user id
userRouter.get('/:id', (req, res) => {
    // return res.json("Hello world");
    res.status(500).json({status: 'error', message: 'This route is not yet defined'});
});

userRouter.post('/signup', userValidation, signUpFunction);

//TODO add validation middleware
userRouter.post('/login', logInFunction);

userRouter.post('/forgotPassword', (req, res) => {
    res.send("Success")
})
userRouter.post('/resetPassword', (req, res) => {
    res.send("Success")
})

// TODO should i use another validation?
// TODO move function to controller
//TODO change the id to use authenticated user id
//TODO Add Authentication and authorization
userRouter.patch('/:id', editUserValidation, editUser);
