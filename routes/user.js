import { Router, json } from "express";
import { userValidation } from "../middlewares/schemavalidations.js";
import { supabase } from "../supabase/supabase.js";

export const userRouter = Router();

userRouter.get('/', (req, res) => {
    // return res.json("Hello world");
    res.json({message: 'Hello World'});
});

userRouter.post('/', userValidation, async (req, res) => {
    const { data, error } = await supabase
        .from('Users')
        .insert({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            role: req.body.role,
            country: req.body.location.country,
            state: req.body.location.state,
            city: req.body.location.city
    });

    console.log(data, error);
    if(error) {
        return res.status(409).json({error: error.message});
    }
    return res.status(201).json({message: "User created successfully"});
});