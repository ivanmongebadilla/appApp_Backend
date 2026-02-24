import { Router, json } from "express";
import { userValidation } from "../middlewares/schemavalidations.js";

export const userRouter = Router();

userRouter.get('/', (req, res) => {
    // return res.json("Hello world");
    res.json({message: 'Hello World'});
});

userRouter.post('/', userValidation, (req, res) => {
    res.json(req.body);
});