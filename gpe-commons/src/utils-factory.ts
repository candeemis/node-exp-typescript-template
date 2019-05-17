import fs from 'fs';
import request from 'superagent';

import { 
    IFileUtils,
    FileUtils
} from './file-util';

import {
    IRestClient,
    RestClient
} from './rest-client';

export interface IUtilsFactory{
    getFileUtils() : IFileUtils;
    getRestClient() : IRestClient;
}

//Factory Pattern being used for dependency injection
export class UtilsFactory implements IUtilsFactory{
    private fileUtils: IFileUtils;
    private restClient: IRestClient;

    constructor(){
        this.fileUtils = new FileUtils(fs);
        this.restClient = new RestClient(request);
    }

    getFileUtils = () => {
        return this.fileUtils;
    }

    getRestClient = () => {
        return this.restClient;
    }
}
