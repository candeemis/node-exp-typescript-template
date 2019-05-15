const cron = require('node-cron');

const { GET } = require('./rest-client');
const {appendUsersData} = require('./users-repo');

const reqesUri = 'https://reqres.in/api/users?page';
const filePath = './data/users.json';


const getUsersFromReqer = async (pageIndex: number) => {
    const pageUri = `${reqesUri}=${pageIndex}`;

    return await GET(pageUri);
}

let pageCounter = 1;
let totalPages = 1;

const getAndSaveUsers = async () => {
    try{
        const users = await getUsersFromReqer(pageCounter);
        
        totalPages = users.total_pages;
        const areAppended = await appendUsersData(filePath, users.data);

        console.log(`appending result of page # ${pageCounter}: ${areAppended}`);
        
        if(pageCounter === totalPages){
            console.log('restarting page counter...');
            pageCounter = 1;
        }else{
            pageCounter++;
        }
        
    }catch(err){
        console.error(err);
    }
}


cron.schedule('* * * * *', async () => {
    await getAndSaveUsers();
});
