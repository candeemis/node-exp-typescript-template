import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'http';
import ApiFactory from './api/api-factory';

export default class App {
    public server: express.Application;

    constructor(private apiFactory: ApiFactory, private readonly PORT = 3300) {
        this.server = express();
        this.configure();
        this.addRoutes();
    }

    private configure = () => {
        this.server.options('*', cors());
        this.server.use(cors());
        this.server.use(bodyParser.json({limit: '25mb'}));
    }

    private addRoutes(): void {
        const router = express.Router();
        const endPoints = this.apiFactory.getEndPoints();
        endPoints.forEach(endPoint => {
            router[endPoint.httpVerb](endPoint.pathString, endPoint.handlers);            
        });
        this.server.use(router);

        //catch 404
        this.server.use(this.notFoundHandler);
        //error handler
        this.server.use(this.errorHandler);
    }

    private notFoundHandler = (req: Request, resp: Response, next: NextFunction) => {
        return resp.status(404).json({ message: 'resource not found!' });
    }

    
    private errorHandler = (err: Error, req: Request, resp: Response, next: NextFunction) => {
        /**
         * In production errors are supposed to be handled based on the environment.
         * */
        console.error(err);
        return resp.status(500).json(err);
    }

    public startServer = (): Server => {
        return this.server.listen(this.PORT, '0.0.0.0', () => {
            console.log(`server is listing at port: ${this.PORT}`);
        });
    }
}