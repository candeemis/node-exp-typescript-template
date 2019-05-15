export {};
const {checkFileExist, writeFileAsync, readFileAsync} = require('./file-util');

const appendUsersData = async (filePath: string, newUsers: any) => {
    //check if file already exists, then append, otherwise write into a new file.
    
    let doesFileExist = false;
    let totalUsers = newUsers;

    try{
        doesFileExist =  await checkFileExist(filePath);
    }catch(err){

    }

    if(doesFileExist){
        //read existing file
        const existingUsersStr = await readFileAsync(filePath);
        
        //append new users into existing users
        const existingUsers = JSON.parse(existingUsersStr);
        existingUsers.push(...newUsers);
        totalUsers = existingUsers;
    }
    
    return await writeFileAsync(filePath, JSON.stringify(totalUsers));
}

module.exports = {appendUsersData};