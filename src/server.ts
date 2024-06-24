import app from './app'
import {createServer} from 'http';
import { Server as HttpServer } from 'http';


const PORT: number = parseInt(process.env.PORT as string, 10) || 8000; // todo: add env-var config
let server: HttpServer;


const startServer = () => {
    server = createServer(app);

    server.listen(PORT, ()=>{
        console.log(`server is listening on port ${PORT}`); //todo: add logger
    })


}

//TODO: add gracefull shutdown


startServer();

