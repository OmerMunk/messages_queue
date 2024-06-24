import express, {Application, Request, Response, NextFunction} from 'express'
import {indexRouter} from "./routes/index.router";


const app: Application = express();




app.use('/', indexRouter)



export default app;

