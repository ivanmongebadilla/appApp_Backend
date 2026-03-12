import { Router } from "express";
import { protectMiddleware } from "../middlewares/protect.js";
import { getAllUserApplications, filterUserApplications, editUserPosition, addApplication } from "../controllers/applicationcontrollers.js";
import { getUser, updateMe, deleteUser } from "../controllers/usercontrollers.js";
import { editPositionValidation, editUserValidation, positionValidation, queryApplicationValidation } from "../middlewares/schemavalidations.js";

export const meRouter = Router()

//Retrun logged in user
meRouter.get('/', protectMiddleware, getUser) 

//Edit Me
meRouter.patch('/', editUserValidation, protectMiddleware, updateMe) 

//Return all applicartions from user id from JWT
meRouter.get('/applications', protectMiddleware, getAllUserApplications)

//Return filtered applications for user id in JWT
meRouter.get('/applications/filter', queryApplicationValidation, protectMiddleware, filterUserApplications)

//Add application 
meRouter.post('/applications', positionValidation, protectMiddleware, addApplication)

//Edit application
meRouter.patch('/applications/:id', editPositionValidation, protectMiddleware, editUserPosition)

//Delete user from JWT user id
meRouter.delete('/', protectMiddleware, deleteUser)