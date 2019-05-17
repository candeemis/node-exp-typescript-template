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

//Factory Pattern being used for dependency injection

class UtilsFactory{
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

export default new UtilsFactory();