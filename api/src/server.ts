import utilsFactory from 'gpe-commons/build';
import {App} from './app';

const app = new App(utilsFactory);
app.startServer();
