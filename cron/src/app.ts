import cron from 'node-cron';

import { UserService } from './services/users-service';
import repoFactory from './persistance/repo-factory';
import utilFactory from './utils/utils-factory';

const reqresUri = 'https://reqres.in/api/users?page';
const filePath = './data/users.json';

const userService = new UserService(
    reqresUri,
    filePath,
    repoFactory.getUserRepo(),
    utilFactory.getRestClient()
    );

cron.schedule('* * * * *', async () => {
    await userService.getAndSaveUsers();
});
