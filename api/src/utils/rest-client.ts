const request = require('superagent');



const GET = async (uri: String) => {
    
    return new Promise((resolve: Function, reject: Function) => {
        request
        .get(uri)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .then((response:any) => resolve(response.body))
        .catch((err: Error) => reject(err));
    });
};

const POST = async (uri: String, data: any) => {
    
    return new Promise((resolve: Function, reject: Function) => {
        request
        .post(uri)
        .send(data)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .then((response:any) => resolve(response.body))
        .catch((err: Error) => reject(err));
    });
};

module.exports = {GET, POST};