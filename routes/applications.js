import { Router } from "express";
import { positionValidation, editPositionValidation } from "../middlewares/schemavalidations.js";
import { supabase } from "../supabase/supabase.js";
import { addApplication, editPosition, getSingleApplication } from "../controllers/applicationcontrollers.js";

export const applicationRouter = Router();

//TODO use route and chain actions .route('').get().post()... when possible

applicationRouter.get('/', (req, res) => {
    res.send("Hellow World from applications")
})

applicationRouter.get('/:id', getSingleApplication);

applicationRouter.post('/', positionValidation, addApplication);

applicationRouter.patch('/:id', editPositionValidation, editPosition);