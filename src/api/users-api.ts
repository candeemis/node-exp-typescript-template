import { Request, Response, NextFunction } from 'express';
import { IUserService } from "../services/user";
import { ApiRoute, EndPoint, HttpVerbs } from "../core/api-route";

export class UsersApi extends ApiRoute{
    
    constructor(private userService: IUserService /* other dependencies go here...*/){
        super('/api/user')
    }

    getEndPoints(): EndPoint[] {
        return [
            {
                pathString: `${this.path}/:userId`, 
                handlers: [this.getSingleUserById],
                httpVerb: HttpVerbs.GET,
            },
            {
                pathString: `${this.path}/`,
                handlers: [this.getAllUsers],
                httpVerb: HttpVerbs.GET,
            }
        ]
    }

    getSingleUserById = async (req: Request, resp: Response, next: NextFunction) => {
        const userId = req.params.userId;
        try{
            const user = await this.userService.getUserById(userId);
            resp.status(200).json(user);
        }catch(err){
            next(err);
        }

    }

    getAllUsers = async (req: Request, resp: Response, next: NextFunction) => {        
        try{
            const users = await this.userService.getAllUsers();
            resp.status(200).json(users);
        }catch(err){
            next(err);
        }
    }
}