import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'http';
import ApiFactory from './api/api-factory';

export default class App {
    public server: express.Application;
    private readonly PORT = 3300;
    constructor(private apiFactory: ApiFactory) {
        this.server = express();
        this.configure();
        this.routes();
    }

    private configure = () => {
        this.server.options('*', cors());
        this.server.use(cors());
        this.server.use(bodyParser.json({limit: '25mb'}));
    }

    private routes(): void {
        const router = express.Router();
        this.apiFactory.registerAllRoutes(router);
        this.server.use(router);

        //catch 404
        this.server.use(this.notFoundHandler);
        //error handler
        this.server.use(this.errorHandler);
    }

    private notFoundHandler = (req: any, res: any, next: Function) => {
        return res.status(404).json({ message: 'resource not found!' });
    }

    
    private errorHandler = (err: Error, req: any, res: any, next: Function) => {
        /**
         * In production errors are supposed to be handled based on the environment.
         * */
        console.error(err);
        return res.status(500).json(err);
    }

    public startServer = (): Server => {
        return this.server.listen(this.PORT, '0.0.0.0', () => {
            console.log(`server is listing at port: ${this.PORT}`);
        });
    }
}