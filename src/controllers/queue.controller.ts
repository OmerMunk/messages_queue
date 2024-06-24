import { Request, Response } from "express";
import { addMessageToQueue, getMessageFromQueue } from "../service/queue.service";

export const addMessageController = async (req: Request, res: Response): Promise<void> => {
    try {
        const queueName: string = req.params.queue_name
        const message = req.body;
        const result: boolean = await addMessageToQueue(queueName, message);
        if (result) {
            res.status(201).json({
                success: true,
                message: 'Message added to queue'
            })
        }
    } catch (error: any) {
        console.error(`[addMessageController] Error: ${error.message}`, error.stack)
        // todo: later on: add a general express error middleware
        console.error(`[addMessageController] Error: ${error.message}`, error.stack)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const getMessageController = async (req: Request, res: Response): Promise<void> => {
    try {
        const queueName: string = req.params.queue_name
        const timeout: number = parseInt(req.query.timeout as string, 10) || 1000 //todo: convert to default variavble
        const message = await getMessageFromQueue(queueName, timeout);
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
        console.error(`[getMessageController] Error: ${error.message}`, error.stack)
        // todo: later on: add a general express error middleware
        console.error(`[addMessageController] Error: ${error.message}`, error.stack)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}
