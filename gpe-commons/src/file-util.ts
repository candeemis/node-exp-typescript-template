
export interface IFileUtils{
    checkFileExist(filePath: string) : Promise<boolean>;
    writeFileAsync(filePath: string, data: any, dataFormat: string): Promise<boolean>;
    readFileAsync(filePath: string, dataFormat: string): Promise<any>;
    deleteFileAsync(filePath: string): Promise<boolean>;
}

export class FileUtils implements IFileUtils{
    constructor(private fs: any){}
    
    checkFileExist = async (filePath: string) : Promise<boolean>=> {
        return new Promise((resolve: Function, reject: Function) => {
            this.fs.open(filePath, 'r', (err: Error, fd: any) => {
                if(err){
                    reject(false);
                }else{
                    this.fs.close(fd, (closeError: Error) => {
                        resolve(true); 
                    });
                }
            });
        });
    }

    writeFileAsync = async(filePath: string, data: any, dataFormat: string = 'utf8'): Promise<boolean> => {
        return new Promise((resolve: Function, reject: Function) => {
            this.fs.writeFile(filePath, data, dataFormat, (err: Error) => {
                if(err){
                    reject(err);
                }else{
                    resolve(true);
                }
            });
        });
    }

    readFileAsync = async (filePath: string, dataFormat: string = 'utf8') : Promise<string> => {
        return new Promise((resolve: Function, reject: Function) => {
            this.fs.readFile(filePath, dataFormat, (err: Error, data: any) => {
                if(err) {
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }

    deleteFileAsync = async (filePath: string): Promise<boolean> => {
        return new Promise((resolve: Function, reject: Function) => {
            this.fs.unlink(filePath, (err: Error) => {
                if(err){
                    reject(err);
                }else{
                    resolve(true);
                }
            });
        });
    }
}