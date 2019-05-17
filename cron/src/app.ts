import cron from 'node-cron';

import { UserService } from './services/users-service';
import repoFactory from './persistance/repo-factory';
import utilsFactory from 'gpe-commons/build';

const reqresUri = 'https://reqres.in/api/users?page';
const filePath = './data/users.json';

const userService = new UserService(
    reqresUri,
    filePath,
    repoFactory.getUserRepo(),
    utilsFactory.getRestClient()
    );

cron.schedule('* * * * *', async () => {
    await userService.getAndSaveUsers();
});
