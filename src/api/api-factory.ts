import { Router } from "express-serve-static-core";
import { UsersApi } from "./users-api";

export interface ExpressRouter {
    registerRoutes(router: Router, ) :void;
}

export interface FakeUserService {
    getUserById(id: number): any;
    getAllUsers(): any[];
}


export default class ApiFactory{
    private routes: ExpressRouter[] = [];

    constructor(){
        this.routes.push(new UsersApi({
            getUserById: (id: number) => {return {id, name: 'boy'}},
            getAllUsers: () => []
        }));
    }

    registerAllRoutes(router: Router){
        this.routes.forEach(route => {
            route.registerRoutes(router);
        });
    }
    
}