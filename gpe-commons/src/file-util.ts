
export interface IFileUtils{
    checkFileExist(filePath: string) : Promise<boolean>;
    writeFileAsync(filePath: string, data: any): Promise<boolean>;
    readFileAsync(filePath: string): Promise<any>;
}

export class FileUtils implements IFileUtils{
    constructor(private fs: any){

    }
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

    writeFileAsync = async(filePath: string, data: any): Promise<boolean> => {
        return new Promise((resolve: Function, reject: Function) => {
            this.fs.writeFile(filePath, data, 'utf8', (err: Error) => {
                if(err){
                    reject(err);
                }else{
                    resolve(true);
                }
            });
        });
    }

    readFileAsync = async (filePath: string) : Promise<string> => {
        return new Promise((resolve: Function, reject: Function) => {
            this.fs.readFile(filePath, 'utf8', (err: Error, data: any) => {
                if(err) {
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
}