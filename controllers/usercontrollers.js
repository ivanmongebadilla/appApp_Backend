import { supabase } from "../supabase/supabase.js";
import { hashPassword } from "../utils/utils.js";

export const signUpFunction = async (req, res) =>{
    const hashedPassword = await hashPassword(req.body.password);
    const { data, error } = await supabase
        .from('Users')
        .insert({
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            role: req.body.role,
            country: req.body.location.country,
            state: req.body.location.state,
            city: req.body.location.city
    });

    console.log(data, error);
    if(error) {
        return res.status(409).json({status: "failed", error: error.message});
    }
    return res.status(201).json({status: "success", message: "User created successfully"});
} 