import express, {Application, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import helmet from 'helmet'
import cors from 'cors'
import {indexRouter} from "./routes/index.router";


const app: Application = express();




app.use('/', indexRouter)



export default app;

