import { Router } from "express-serve-static-core";
import { ExpressRouter } from './api-factory';
import { IUserService } from "../services/user";

export class UsersApi implements ExpressRouter{
    private readonly api = '/api/user';
    constructor(private userService: IUserService /* other dependencies go here...*/){}

    public registerRoutes = (router: Router, ): void => {
        router.get(`${this.api}/:userId(\\d+)`, this.getSingleUserById);
        router.get(`${this.api}/`, this.getAllUsers);
    }


    public getSingleUserById = async (req: any, resp: any, next: Function) => {
        const userId = req.params.userId;
        try{
            //get user data from reqers api
            const user = await this.userService.getUserById(userId);
            resp.status(200).json(user);
        }catch(err){
            next(err);
        }

    }

    public getAllUsers = async (req: any, resp: any, next: Function) => {
        
        try{
            const users = await this.userService.getAllUsers();
            resp.status(200).json(users);
            return;
        }catch(err){
            next(err);
        }

    }
}