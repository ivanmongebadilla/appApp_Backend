import { Router } from "express";
import { positionValidation, editPositionValidation, queryApplicationValidation } from "../middlewares/schemavalidations.js";
import { supabase } from "../supabase/supabase.js";
import { addApplication, editPosition, filterApplications, getSingleApplication, getAllApplications } from "../controllers/applicationcontrollers.js";
import { protectMiddleware, authorizationMiddleware } from "../middlewares/protect.js";

export const applicationRouter = Router();

//TODO add protectMiddleware where needed

//TODO use route and chain actions .route('').get().post()... when possible

//TODO should i use this to get all applications or only user_id applications
applicationRouter.get('/', protectMiddleware, authorizationMiddleware('admin'), getAllApplications).post('/', positionValidation, protectMiddleware, addApplication)

applicationRouter.get('/filter', queryApplicationValidation, filterApplications)

applicationRouter
    .route('/:id')
    .get(getSingleApplication)
    .patch(editPositionValidation, editPosition)
    .delete(protectMiddleware, authorizationMiddleware('admin'), (req, res) => {
        return res.send("Successful")
    });
