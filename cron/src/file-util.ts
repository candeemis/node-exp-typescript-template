export {};

const fs = require('fs');



const checkFileExist = async (filePath: string) : Promise<boolean>=> {
    return new Promise((resolve: Function, reject: Function) => {
        fs.open(filePath, 'r', (err: Error, fd: any) => {
            if(err){
                reject(false);
            }else{
                fs.close(fd, (closeError: Error) => {
                    resolve(true); 
                });
            }
        });
    });
}




const writeFileAsync = async(filePath: string, data: any) => {
    return new Promise((resolve: Function, reject: Function) => {
        fs.writeFile(filePath, data, 'utf8', (err: Error) => {
            if(err){
                reject(err);
            }else{
                resolve(true);
            }
        });
    });
}


const readFileAsync = async (filePath: string) : Promise<string> => {
    return new Promise((resolve: Function, reject: Function) => {
        fs.readFile(filePath, 'utf8', (err: Error, data: any) => {
            if(err) {
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

module.exports = {checkFileExist, writeFileAsync, readFileAsync}