import { IFileUtils } from 'gpe-commons/build';

export class FileUtilMock implements IFileUtils{
    deleteFileAsync = async (filePath: string): Promise<boolean> => {
        return Promise.resolve(true);
    }

    checkFileExist = async (filePath: string): Promise<boolean> => {
        return Promise.resolve(true);
    }

    writeFileAsync = async (filePath: string, data: any, dataFormat: string): Promise<boolean> => {
        return Promise.resolve(true);
    }
    readFileAsync = async (filePath: string, dataFormat: string): Promise<any> => {

        return Promise.resolve("[]");
    }
}


