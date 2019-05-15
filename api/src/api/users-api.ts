export {};
const express = require('express');

const {GET, POST} = require('./../rest-client');
const {writeFileAsync, readFileAsync, deleteFileAsync} = require('./../file-util');


const usersApi = express.Router();
const reqresUri = 'https://reqres.in/api/users';
const filePath = './avatars';

const getUserFromReqres = async (userId: number) => {
    const resp = await GET(`${reqresUri}/${userId}`);
    return resp.data;
}



usersApi.get('/:userId(\\d+)',
    async (req: any, resp: any, next: Function) => {
        const userId = req.params.userId;
        try{
            //get user data from reqers api
            const user = await getUserFromReqres(userId);
            resp.status(200).json(user);
        }catch(err){
            next(err);
        }

    }
);

usersApi.get('/:userId(\\d+)/avatar',
    async (req: any, resp: any, next: Function) => {
        const userId = req.params.userId;
        const avatarFilePath = `${filePath}/${userId}.txt`;
        //first check if the file already exist
        try{
            const avatarData = await readFileAsync(avatarFilePath)
            resp.status(200).json(avatarData);
            return;
        }catch(err){
            //skip error, and get the file from the given server.
            //in production, we would check error type specifically if the some other type of error occurs.
        }

        try{
            //get user data
            const user = await getUserFromReqres(userId);

            //get user's avatar
            const avatarResp = await GET(user.avatar);

            //convert avatar to base64
            const avatarBase64 = Buffer.from(avatarResp).toString('base64');

            //save file
            await writeFileAsync(avatarFilePath, avatarBase64);

            //return avatar base64
            resp.status(200).json(avatarBase64);
        }catch(err){
            next(err);
        }

    }
);

usersApi.delete('/:userId(\\d+)/avatar', async (req: any, resp: any, next: Function) => {
    const userId = req.params.userId;
    const avatarFilePath = `${filePath}/${userId}.txt`;

    try{
        const deleteResp = await deleteFileAsync(avatarFilePath);
        resp.status(200).json(deleteResp);
    }catch(err){
        if(err.code == 'ENOENT'){
            resp.status(401).json({message: 'File not found!'});
            return;
        }
        next(err);
    }
});

module.exports = {usersApi};