import { Router } from "express-serve-static-core";
import { IFileUtils, IRestClient } from 'gpe-commons/build'

export class UsersApi{
    private readonly reqresUri = 'https://reqres.in/api/users';
    private readonly filePath = './avatars';
    private readonly api = '/api/user';
    constructor(
        private router: Router,
        private fileUtils: IFileUtils,
        private restClient: IRestClient){

        this.registerRoutes();
    }

    private registerRoutes = () => {
        this.router.get(`${this.api}/:userId(\\d+)`, this.getSingleUserById);
        this.router.get(`${this.api}/:userId(\\d+)/avatar`, this.getAvatarByUserId);
        this.router.delete(`${this.api}/:userId(\\d+)/avatar`, this.deleteAvatarByUserId);
    }

    public getUserFromReqres = async (userId: number) => {
        const resp = await this.restClient.GET(`${this.reqresUri}/${userId}`);
        return resp.data;
    }

    public getSingleUserById = async (req: any, resp: any, next: Function) => {
        const userId = req.params.userId;
        try{
            //get user data from reqers api
            const user = await this.getUserFromReqres(userId);
            resp.status(200).json(user);
        }catch(err){
            next(err);
        }

    }

    public getAvatarByUserId = async (req: any, resp: any, next: Function) => {
        const userId = req.params.userId;
        const avatarFilePath = `${this.filePath}/${userId}.txt`;
        //first check if the file already exist
        try{
            const avatarData = await this.fileUtils.readFileAsync(avatarFilePath, 'base64');
            resp.status(200).json(avatarData);
            return;
        }catch(err){
            //skip error, and get the file from the given server.
            //in production, we would check error type specifically if the some other type of error occurs.
        }

        try{
            //get user data
            const user = await this.getUserFromReqres(userId);

            //get user's avatar
            const avatarResp = await this.restClient.GET(user.avatar);

            //convert avatar to base64
            const avatarBase64 = Buffer.from(avatarResp).toString('base64');

            //save file
            await this.fileUtils.writeFileAsync(avatarFilePath, avatarBase64, 'base64');

            //return avatar base64
            resp.status(200).json(avatarBase64);
        }catch(err){
            next(err);
        }

    }

    public deleteAvatarByUserId = async (req: any, resp: any, next: Function) => {
        const userId = req.params.userId;
        const avatarFilePath = `${this.filePath}/${userId}.txt`;
    
        try{
            const deleteResp = await this.fileUtils.deleteFileAsync(avatarFilePath);
            resp.status(200).json(deleteResp);
        }catch(err){
            if(err.code == 'ENOENT'){
                resp.status(401).json({message: 'File not found!'});
                return;
            }
            next(err);
        }
    }
}