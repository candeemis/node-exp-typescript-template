import { UserService } from './../../services/users-service';
import { IUserRepo } from "./../../persistance/users-repo";
import { IRestClient } from "gpe-commons/build";
import {UserModel, UsersResponseModel} from "../../models/user-model";

class UserRepoMock implements IUserRepo{
    appendUsersData(filePath: string, newUsers: UserModel[]): Promise<boolean> {
        return Promise.resolve(true);
    }
}

class RestClientMock implements IRestClient{
    GET(uri: String): Promise<any> {
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
    
    POST(uri: String, data: any): Promise<any> {
        return Promise.resolve(true);
    }    
}

describe('user service', () => {
    it('should get users resp from reqres api.', async () => {
        const userService = new UserService("http", "a.txt", new UserRepoMock(), new RestClientMock());
        try {
            const resp = await userService.getUsersFromReqer();
            expect(resp).toBeTruthy();
            expect(resp.page).toBe(1);
        } catch (error) {
            fail(error);
        }
    });

    it('should get and save users', async() => {
        const userService = new UserService("http", "a.txt", new UserRepoMock(), new RestClientMock());
        try {
            const resp = await userService.getAndSaveUsers();
            expect(resp).toBeUndefined();
        } catch (error) {
            fail(error);
        }
    })
});