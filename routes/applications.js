import { Router } from "express";
import { positionValidation, editPositionValidation, queryApplicationValidation } from "../middlewares/schemavalidations.js";
import { supabase } from "../supabase/supabase.js";
import { addApplication, editPosition, filterApplications, getSingleApplication } from "../controllers/applicationcontrollers.js";

export const applicationRouter = Router();

//TODO use route and chain actions .route('').get().post()... when possible

//TODO should i use this to get all applications or only user_id applications
applicationRouter.get('/', (req, res) => {
    return res.send("Successful")
}).post('/', positionValidation, addApplication)

applicationRouter.get('/filter', queryApplicationValidation, filterApplications)

applicationRouter
    .get('/:id', getSingleApplication)
    .patch('/:id', editPositionValidation, editPosition);
