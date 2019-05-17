import { IFileUtils } from 'gpe-commons/build';
import { UserModel } from '../models/user-model';

export interface IUserRepo{
    appendUsersData(filePath: string, newUsers: [UserModel]): Promise<boolean>;
}

export class UsersRepo implements IUserRepo{

    constructor(private fileUtils: IFileUtils){}

    appendUsersData = async (filePath: string, newUsers: [UserModel]) : Promise<boolean> => {
        //check if file already exists, then append, otherwise write into a new file.
        
        let doesFileExist = false;
        let totalUsers = newUsers;
    
        try{
            doesFileExist =  await this.fileUtils.checkFileExist(filePath);
        }catch(err){
    
        }
    
        if(doesFileExist){
            //read existing file
            const existingUsersStr = await this.fileUtils.readFileAsync(filePath);
            
            //append new users into existing users
            const existingUsers = JSON.parse(existingUsersStr);
            existingUsers.push(...newUsers);
            totalUsers = existingUsers;
        }
        
        return await this.fileUtils.writeFileAsync(filePath, JSON.stringify(totalUsers));
    }
}