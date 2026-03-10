import { Router } from "express";
import { protectMiddleware } from "../middlewares/protect.js";
import { getAllUserApplications } from "../controllers/applicationcontrollers.js";
import { getUser, updateMe, deleteUser } from "../controllers/usercontrollers.js";
import { editUserValidation } from "../middlewares/schemavalidations.js";

export const meRouter = Router()

meRouter.get('/', protectMiddleware, getUser) //Retrun logged in user
meRouter.patch('/', editUserValidation, protectMiddleware, updateMe) 
meRouter.get('/applications', protectMiddleware, getAllUserApplications) //Return all applicartions from logged in user
meRouter.delete('/', protectMiddleware, deleteUser)