import express from 'express';
import routes from './routes';
import logRequests from './app/middlewares/logRequests';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(logRequests);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
