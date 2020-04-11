import { UsersApi } from "./users-api";
import { UserService } from "../services/user";
import { ApiRoute, EndPoint } from "../core/api-route";

export default class ApiFactory{
    private routes: ApiRoute[] = [];

    constructor(){
        this.routes.push(new UsersApi(new UserService));
    }

    getEndPoints(): EndPoint[]{
        let endPoints: EndPoint[] = [];
        return endPoints.concat(...this.routes.map(r => r.getEndPoints()));
    }
}