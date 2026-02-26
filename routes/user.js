import { Router, json } from "express";
import { userValidation } from "../middlewares/schemavalidations.js";
import {signUpFunction} from '../controllers/usercontrollers.js';

export const userRouter = Router();

// TODO we can validate the ID here so we dont have to repeat code in the controller
// TODO can even move the function to the controller file 
userRouter.param('id', (req, res, next, val) => {
    console.log(`User id is: ${val}`)
})

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

userRouter.post('/', userValidation, signUpFunction);

// TODO should i use another validation?
// TODO move function to controller
userRouter.patch('/:id', userValidation, (req, res) =>{
    res.status(500).json({status: 'error', message: 'This route is not yet defined'});
})