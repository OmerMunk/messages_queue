import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api.error';

/**
 * Error Handler
 * @param error {Error | ApiError} - the error object
 * @param req {Request} - express request object
 * @param res {Response} - express Response object
 * @param next {NextFunction} - express nextFunction object
 */
const errorHandlerMiddleware = (error: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        });
    } else {
        console.error('ERROR 💥', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

export default errorHandlerMiddleware;
