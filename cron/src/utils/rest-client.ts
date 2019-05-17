
export interface IRestClient{
    GET(uri: String):Promise<any>;
    POST(uri: String, data: any): Promise<any>;
}

export class RestClient implements IRestClient{

    constructor(private request: any){

    }

    GET = async (uri: String): Promise<any> => {    
        return new Promise((resolve: Function, reject: Function) => {
            this.request
            .get(uri)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then((response:any) => resolve(response.body))
            .catch((err: Error) => reject(err));
        });
    };

    POST = async (uri: String, data: any): Promise<any> => { 
        return new Promise((resolve: Function, reject: Function) => {
            this.request
            .post(uri)
            .send(data)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then((response:any) => resolve(response.body))
            .catch((err: Error) => reject(err));
        });
    };
}