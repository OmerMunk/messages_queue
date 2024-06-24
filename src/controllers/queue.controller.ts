import {Request, Response, NextFunction} from "express";
import {addMessageToQueue, getMessageFromQueue} from "../service/queue.service";

export const addMessageController = async (req: Request, res: Response) => {
    try {
        const queueName = req.params.queue_name
        const message = req.body;
        // console.log(`controller sending message: ${JSON.stringify(message)}`)
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
        // console.log('in message controller')
        const queueName = req.params.queue_name
        // console.log('queueName', queueName)
        const message = await getMessageFromQueue(queueName, 1000);
        // console.log(`message: ${message}`)
        if (message) {
            res.status(200).json({
                success: true,
                message
            })
        } else {
            res.status(204).json({
                success: false,
                message: 'No message found'
            })
        }
    } catch (error: any) {
        // todo: add error logic
    }
}
