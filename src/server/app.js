/**
 * app.js -- Server class --> Responds to requests for Client Side Routes
 */

import koa from 'koa';     //kinda like flask/express -- but with generators!
import serve from 'koa-static'; //serve static routes -- /static in our case
import _ from 'koa-route'; //small router by koa
import routes from './routes.js'; //handler functions for routes

class Server {

  //Initialize Routes and Server
  constructor(options) {

    //setup server
    const server = koa();
    this.server = server;

    //passed in -- option from config.js
    this.port = options.port;

    //cache reference to class
    const that = this;

    //keep track of active requests
    this.activeRequests = 0;

    //log requests -- middleware
    server.use(function *(next){
      var start = new Date;
      yield next;
      var ms = new Date - start;
      console.log(`${this.method} '${this.url}' -- ${ms} ms`);
    });

    //make static folder static
    server.use(serve(__dirname + '/../../static'));

    //handle front page view
    server.use(_.get('/', routes.handleFP));

    //handle login view
    server.use(_.get('/login', routes.handleLogin));

    //handle register view (signup)
    server.use(_.get('/register', routes.handleRegister));

    //handle search view
    server.use(_.get('/search/:query', routes.handleSearch));

    //handle user (settings)
    server.use(_.get('/user/:username', routes.handleSettings));

    //handle group view
    server.use(_.get('/:group', routes.handleGroup));

    //handle thread view
    server.use(_.get('/:group/:threadID', routes.handleThread));

  }

  //log number of active requests
  logRequests() {
    console.log(`Active Requests: ${this.activeRequests}`);
  }

  //go go server
  start () {
    this.server.listen(this.port);
  }

}

export default Server;
