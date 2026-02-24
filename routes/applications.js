import { Router } from "express";

export const applicationRouter = Router();

applicationRouter.get('/', (req, res) => {
    res.send("Hellow World from applications")
})