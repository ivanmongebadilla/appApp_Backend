import { Router } from "express";
import { positionValidation } from "../middlewares/schemavalidations.js";

export const applicationRouter = Router();

applicationRouter.get('/', (req, res) => {
    res.send("Hellow World from applications")
})

applicationRouter.post('/', positionValidation, (req, res) => {
    res.json(req.body);
});