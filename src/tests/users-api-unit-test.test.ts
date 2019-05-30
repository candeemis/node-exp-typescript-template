import request from 'supertest';

import App  from './../app';
import { Server } from 'http';
import ApiFactory from '../api/api-factory';



describe('users api', () => {
    let app: App;
    let server: Server;

    beforeAll(() => {
        app = new App(new ApiFactory(/* provide Mock if any */));
        server = app.startServer();
    });

    afterAll(() => {
        server.close();
    });

    it('should fetch single user by Id', async () => {
        const response = await request(app.server).get('/api/user/1');
        expect(response.status).toBe(200)
    });

    it('should fetch all users', async () => {
        const response = await request(app.server).get('/api/user/');
        expect(response.status).toBe(200);
    });

});