import { Router } from "express-serve-static-core";
import { UsersApi } from "./users-api";
import { UserService } from "../services/user";

export interface ExpressRouter {
    registerRoutes(router: Router, ) :void;
}


export default class ApiFactory{
    private routes: ExpressRouter[] = [];

    constructor(){
        this.routes.push(new UsersApi(new UserService));
    }

    registerAllRoutes(router: Router){
        this.routes.forEach(route => {
            route.registerRoutes(router);
        });
    }
    
}