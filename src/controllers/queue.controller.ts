import {Request, Response, NextFunction} from "express";
import {addMessageToQueue, getMessageFromQueue} from "../service/queue.service";

export const addMessageController = async (req: Request, res: Response) => {
    try {
        const queueName = req.params.queue_name
        const message = req.body;
        const result = await addMessageToQueue(queueName, message);
        if (result) {
            res.status(201).json({
                success: true,
                message: 'Message added to queue'
            })
        }
    } catch (error: any) {
        // todo: add error logic
    }
}

export const getMessageController = async (req: Request, res: Response) => {
    try {
        const queueName = req.params.queue_name
        const message = await getMessageFromQueue(queueName, 1000);
        if (message) {
            res.status(200).json({
                success: true,
                message
            })
        }
    } catch (error: any) {
        // todo: add error logic
    }
}
