import {Router} from 'express';
// import {validateAddMessage} from "../middlewares/validations/addMessage.middleware"; // todo: implement a validation using zod
import {addMessageController, getMessageController} from "../controllers/queue.controller";
import {validateAddMessage} from "../middlewares/validations/addMessage.middleware";


export const queueRouter: Router = Router();

//todo: consider using a queueController instance of a class

queueRouter.get('/:queue_name', getMessageController);

queueRouter.post('/:queue_name', validateAddMessage ,addMessageController);
