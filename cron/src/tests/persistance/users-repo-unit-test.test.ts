import { UsersRepo } from './../../persistance/users-repo';
import { IFileUtils } from 'gpe-commons/build';

class FileUtilMock implements IFileUtils{
    deleteFileAsync(filePath: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    checkFileExist(filePath: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    writeFileAsync(filePath: string, data: any): Promise<boolean> {
        return Promise.resolve(true);
    }
    readFileAsync(filePath: string): Promise<any> {

        return Promise.resolve("[]");
    }
}

describe('users repo', () => {
    it('should append users data', async () => {
        const fileName = "users.txt";
        const data = [
            {
                id: 1,
                email: 'nj@ex.com',
                avatar: 'avatar-link',
                first_name: 'n',
                last_name: 'j'
            }
        ];

        const userRepo = new UsersRepo(new FileUtilMock());
        try {
            const result = await userRepo.appendUsersData(fileName, data);
            expect(result).toBe(true);
        } catch (error) {
            fail(error);
        }
    });
});