import App from './app';
import ApiFactory from './api/api-factory';

const app = new App(new ApiFactory());
app.startServer();
