/**
 * @class
 * @name ApiError
 * @description ApiError class to handle api errors by the client
 */
export class ApiError extends Error {
    statusCode: number;
    status: string;

    /**
     * @constructor
     * @param statusCode {number} - the error status code
     * @param message {string} - ethe rror message
     * @param stack {string} - the error stack trace
     */
    constructor(statusCode: number, message: string, stack: string = '') {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
