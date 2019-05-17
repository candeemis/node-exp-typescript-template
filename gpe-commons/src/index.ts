export { IFileUtils } from './file-util';
export { IRestClient } from './rest-client';
export { IUtilsFactory } from './utils-factory';
import { UtilsFactory } from './utils-factory';
const utilsFactory = new UtilsFactory();
export default utilsFactory;


