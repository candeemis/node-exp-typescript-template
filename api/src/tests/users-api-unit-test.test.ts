import request from 'supertest';

import { FileUtilMock } from './file-mock';
import { RestClientMock } from './rest-mock';

import { App } from './../app';
import { Server } from 'http';


const utilsFactoryMock = {
    getFileUtils: () => {
        return new FileUtilMock();
    },

    getRestClient: () => {
        return new RestClientMock();
    }
}




describe('users api', () => {
    let app: App;
    let server: Server;

    beforeAll(() => {
        app = new App(utilsFactoryMock);
        server = app.startServer();
    });

    afterAll(() => {
        server.close();
    });

    it('should fetch single user by Id', async () => {
        const response = await request(app.server).get('/api/user/1');
        expect(response.status).toBe(200)
    });

    it('should fetch avatar by Id', async () => {
        const response = await request(app.server).get('/api/user/1/avatar');
        expect(response.status).toBe(200);
    });

    it('should delete avatar by Id', async () => {
        const response = await request(app.server).delete('/api/user/1/avatar');
        expect(response.status).toBe(200);
    });

});