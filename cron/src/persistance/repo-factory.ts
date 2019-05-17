import { IUserRepo, UsersRepo } from "./users-repo";
import utilsFactory from "gpe-commons/build";

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