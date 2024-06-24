import express, {Application, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import helmet from 'helmet'
import cors from 'cors'
import {indexRouter} from "./routes/index.router";
import errorHandlerMiddleware from './middlewares/errors.middleware'



const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(cookieParser())
app.use(cors())




app.use('/', indexRouter)

app.use(errorHandlerMiddleware)



export default app;

