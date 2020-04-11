export interface IUserService {
    getUserById(id: number): any;
    getAllUsers(): any[];
}

export class UserService implements IUserService {
    getUserById = (id: number) => {return {id, name: 'boy'}};
    getAllUsers = () => [];
}
