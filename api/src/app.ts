import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { IUtilsFactory } from 'gpe-commons/build';
import { UsersApi } from './api/users-api';
import { Server } from 'http';

export class App {
    public server: express.Application;
    private readonly PORT = 3000;
    constructor(private utilsFactory: IUtilsFactory) {
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

        const users = new UsersApi(router, this.utilsFactory.getFileUtils(), this.utilsFactory.getRestClient());

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