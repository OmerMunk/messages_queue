import express from 'express';
// import {validateAddMessage} from "../middlewares/validations/addMessage.middleware"; // todo: implement a validation using zod
import {addMessageController, getMessageController} from "../controllers/queue.controller";


export const queueRouter = express.Router();

//todo: consider using a  queueController instance of a class


queueRouter.get('/:queue_name', getMessageController);

queueRouter.post('/:queue_name', addMessageController);
