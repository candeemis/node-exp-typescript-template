import request from 'superagent';
import config from './superagent-mock-config';
const agentMock = require('superagent-mock');
import { RestClient } from './../rest-client';


describe('rest client', () => {

    let superagentMock: any;

    beforeAll(() => {
        superagentMock = agentMock(request, config);
    });

    afterAll(() => {
        superagentMock.unset();
    });

    it('should fetch user a single user', async () => {
        const restClient = new RestClient(request);

        const api = 'https://reqres.in/api/users/1';
        try {
            const result = await restClient.GET(api);  
            expect(result).not.toBeNull();  
        } catch (error) {
            fail(error);
        }        
    });

    it('should fetch avatar of a user', async () => {
        const restClient = new RestClient(request);

        const api = 'https://reqres.in/api/avatar/128.jpg';
        try {
            const result = await restClient.GET(api);  
            expect(result).not.toBeNull(); 
            expect(Array.isArray(result)).toBe(true); 
        } catch (error) {
            fail(error);
        }        
    });

    
});