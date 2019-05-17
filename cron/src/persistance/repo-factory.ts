import { IUserRepo, UsersRepo } from "./users-repo";
import utilsFactory from './../utils/utils-factory';

class ReposFactory{
    
    private userRepo: IUserRepo;

    constructor(){
        this.userRepo = new UsersRepo(utilsFactory.getFileUtils());
    }

    getUserRepo = () => {
        return this.userRepo;
    }
}

export default new ReposFactory();