import { Router } from "express";
import { positionValidation, editPositionValidation, queryApplicationValidation } from "../middlewares/schemavalidations.js";
import { addApplication, editPosition, filterApplications, getSingleApplication, getAllApplications, deleteApplication } from "../controllers/applicationcontrollers.js";
import { protectMiddleware, authorizationMiddleware } from "../middlewares/protect.js";

export const applicationRouter = Router();

applicationRouter.get('/', protectMiddleware, authorizationMiddleware('admin'), getAllApplications).post('/', positionValidation, protectMiddleware, addApplication)

applicationRouter.get('/filter', protectMiddleware, authorizationMiddleware('admin'), queryApplicationValidation, filterApplications)

applicationRouter
    .route('/:id')
    .get(protectMiddleware, authorizationMiddleware('admin'), getSingleApplication)
    .patch(editPositionValidation, protectMiddleware, authorizationMiddleware('admin'), editPosition)
    .delete(protectMiddleware, authorizationMiddleware('admin'), deleteApplication);
