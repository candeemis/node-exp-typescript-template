const express = require('express');
const {join} = require('path');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

const server = express();

const cors = require('cors');
server.options('*', cors());
server.use(cors());

server.use(bodyParser.json({limit: '25mb'}));
server.use(fileupload({
    limits: { fileSize: 10 * 1024 * 1024 },
    safeFileNames: true,
    preserveExtension: 4,
    abortOnLimit:true
}));


const {usersApi} = require('./api/users-api');

server.use('/api/user', usersApi);

//catch 404
server.use((req: any, res: any, next: Function)=>{
    return res.status(404).json({message: 'resource not found!'});
});

//error handler
server.use((err: Error, req: any, res: any, next: Function)=>{
    
    /**
     * In production errors are supposed to be handled based on the environment.
     * */
    console.error(err);
    return res.status(500).json(err);
});

// in real apps port to be provided through env
const PORT = 3000;
server.listen(PORT, '0.0.0.0',()=>{
    console.info(`server is up and listing at port: ${PORT}`);
});

module.exports = {server};

