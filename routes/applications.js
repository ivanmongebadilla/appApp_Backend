import { Router } from "express";
import { positionValidation } from "../middlewares/schemavalidations.js";
import { supabase } from "../supabase/supabase.js";

export const applicationRouter = Router();

applicationRouter.get('/', (req, res) => {
    res.send("Hellow World from applications")
})

applicationRouter.post('/', positionValidation, async(req, res) => {
    const { data, error } = await supabase
        .from('Applications')
        .insert({
            user_id: req.body.userid, //Just for now, it should change to get user_id from jwt
            company: req.body.companyName,
            position: req.body.positionTitle,
            employment_type: req.body.employmentType,
            work_mode: req.body.workMode,
            link: req.body.link,
            min_salary: req.body.salary.min,
            max_salary: req.body.salary.max,
            currency: req.body.salary.currency,
            status: req.body.status,
            priority: req.body.priority,
            note: req.body.notes,
            applied_date: req.body.appliedAt,
            country: req.body.location.country,
            state: req.body.location.state,
            city: req.body.location.city
        })

    if(error) {
        return res.status(409).json({error: error.message});
    }
    return res.status(201).json({message: "Application added succesfully"});
    //res.json(req.body);
});