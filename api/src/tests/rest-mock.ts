import { IRestClient } from 'gpe-commons/build';

export class RestClientMock implements IRestClient {
    GET = async (uri: String): Promise<any> => {
        const resp = {
            page: 1,
            per_page: 3,
            total: 12,
            total_pages: 4,
            data: [
                {
                    id: 1,
                    email: 'nj@ex.com',
                    avatar: 'avatar-link',
                    first_name: 'n',
                    last_name: 'j'
                }
            ],
        };

        return Promise.resolve(resp);
    }

    POST = async (uri: String, data: any): Promise<any> => {
        return Promise.resolve(true);
    }

}

