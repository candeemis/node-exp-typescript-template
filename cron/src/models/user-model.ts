export interface UserModel{
    id: number;
    email: string;
    avatar: string;

    /*the name of the following properties seems to be following PEP8 standard of Python.
    Otherwise they should be in camelCase style.*/
    
    first_name: string;
    last_name: string;
}

export interface UsersResponseModel{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: [UserModel];
}