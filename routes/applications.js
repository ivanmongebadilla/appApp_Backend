import { Router } from "express";
import { editPositionValidation, queryApplicationValidation } from "../middlewares/schemavalidations.js";
import { editPosition, filterApplications, getSingleApplication, getAllApplications, deleteApplication } from "../controllers/applicationcontrollers.js";
import { protectMiddleware, authorizationMiddleware } from "../middlewares/protect.js";

// ########## COMPLETED FOR VERSION 1 ########## \\

//This is a route for applications for Admin user only 

export const applicationRouter = Router();

//Access only for Admin user
//Get all applications
applicationRouter.get('/', protectMiddleware, authorizationMiddleware('admin'), getAllApplications)

//Access only for Admin user
//Get filtered applications 
applicationRouter.get('/filter', protectMiddleware, authorizationMiddleware('admin'), queryApplicationValidation, filterApplications)

//Access only for Admin user
//Get application by id param
applicationRouter.get('/:id', protectMiddleware, authorizationMiddleware('admin'), getSingleApplication)

//Access only for Admin user
//Edit application by id param
applicationRouter.patch('/:id', editPositionValidation, protectMiddleware, authorizationMiddleware('admin'), editPosition)

//Access only for Admin user
//Delete application by id param
applicationRouter.delete('/:id', protectMiddleware, authorizationMiddleware('admin'), deleteApplication);
