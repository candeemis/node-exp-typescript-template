import { UsersResponseModel } from "../models/user-model";
import { IUserRepo } from "../persistance/users-repo";
import { IRestClient } from "gpe-commons/build";

export class UserService{
    private pageCounter: number;
    private totalPages: number;

    constructor(
        private reqesUri: string,
        private filePath: string,
        private userRepo: IUserRepo,
        private restClient: IRestClient
        ){
        this.pageCounter = 1;
        this.totalPages = 1;
    }

    getUsersFromReqer = async () : Promise<UsersResponseModel> => {
        const pageUri = `${this.reqesUri}=${this.pageCounter}`;
        return await this.restClient.GET(pageUri);
    }

    getAndSaveUsers = async (): Promise<void> => {
        try{
            const usersResponse = await this.getUsersFromReqer();
            
            this.totalPages = usersResponse.total_pages;

            const areAppended = await this.userRepo.appendUsersData(this.filePath, usersResponse.data);
    
            console.log(`appending result of page # ${this.pageCounter}: ${areAppended}`);
            
            if(this.pageCounter === this.totalPages){
                console.log('restarting page counter...');
                this.pageCounter = 1;
            }else{
                this.pageCounter++;
            }
            
        }catch(err){
            console.error(err);
        }
    }
    
}
