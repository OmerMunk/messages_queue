import express, {Application, Request, Response, NextFunction} from 'express'


const app: Application = express();




app.post('/', (req: Request, res: Response, next: NextFunction)=>{
    res.status(200).json({
        success: true,
        message: 'Hello World'
    })
})



export default app;

