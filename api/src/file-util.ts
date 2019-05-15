const fs = require('fs');

const writeFileAsync = async(filePath: string, data: any) => {
    return new Promise((resolve: Function, reject: Function) => {
        fs.writeFile(filePath, data, (err: Error) => {
            if(err){
                reject(err);
            }else{
                resolve()
            }
        });
    });
}

const readFileAsync = async (filePath: string) => {
    return new Promise((resolve: Function, reject: Function) => {
        fs.readFile(filePath, 'base64', (err: Error, data: any) => {
            if(err) {
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

const deleteFileAsync = async (filePath: string) => {
    return new Promise((resolve: Function, reject: Function) => {
        fs.unlink(filePath, (err: Error) => {
            if(err){
                reject(err);
            }else{
                resolve(true);
            }
        });
    });
}

module.exports = {writeFileAsync, readFileAsync, deleteFileAsync}