import { z } from 'zod';
import { Request, Response, NextFunction } from "express";
import {ApiError} from "../../errors/api.error";

/**
 * @name messageSchema
 */
const messageSchema = z.object({
    sender: z.string(),
    text: z.string(),

});


/**
 * @name validateAddMessage
 * @description Middleware to validate the request body for adding a message
 * @param req {Request} - request object
 * @param res {Response} - response object
 * @param next {NextFunction} - next function
 */
export const validateAddMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        messageSchema.parse(req.body);
        next();
    } catch (error: any) {
        next(new ApiError(400, JSON.stringify(error.errors)));
    }
}


