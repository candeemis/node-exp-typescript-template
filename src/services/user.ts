export interface IUserService {
    getUserById(id: string): any;
    getAllUsers(): any[];
}

export class UserService implements IUserService {
    getUserById = (id: string) => {return {id, name: 'boy'}};
    getAllUsers = () => [];
}
