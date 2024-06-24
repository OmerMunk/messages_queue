import express from "express";
import {queueRouter} from "./queue.router";

export const indexRouter = express.Router();

indexRouter.use('/api', queueRouter);
