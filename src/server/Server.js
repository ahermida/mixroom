/**
 * app.js -- Server class --> Responds to requests for Client Side Routes
 */

import koa from 'koa'; //kinda like flask/express -- but with generators!
import serve from 'koa-send'; //serve static routes -- /static in our case
import _ from 'koa-route'; //small router by koa
import routes from './routes.js'; //handler functions for routes
import mount from 'koa-mount' //allows us to mount paths
import { connect } from './init.js'; //function to connect to DB (so we don't on master process)
import bodyParser from 'koa-bodyparser'; //easy access to json body

class Server {

  //Initialize Routes and Server
  constructor(options) {

    //setup server
    const server = koa();
    this.server = server;

    //passed in -- option from config.js
    this.port = options.port;

    //keep track of active requests
    this.activeRequests = 0;

    //log requests & track active -- middleware
    server.use(function *(next){
      var start = new Date;
      this.activeRequests++;
      yield next;
      var ms = new Date - start;
      this.activeRequests--;
      console.log(`${this.method} '${this.url}' -- ${ms} ms`);
      if (!options.test) {
        process.send({'cmd': 'notifyRequest'});
      }
    });

    //set up body parser for easy-access to json
    server.use(bodyParser({formLimit: '4mb'}));

  //  server.use(*()=> yield send(this, this.path, { root: __dirname + '/../../static' }))

    //make static folder static
    server.use(mount('/static', function *() { yield serve(this, this.path, { root: `${__dirname}/../../static`})}));

    //handle front page view -- proxy for /random/ until we (I) get some metric for rating -- switches on page 1
    server.use(_.get('/', routes.handleFP));

    //handle oembed -- kind of a proxy for oembed endpoints
    server.use(_.post('/embed', routes.handleEmbed));

    //handle uploads
    server.use(_.post('/upload', routes.handleUpload));

    //handle login view
    server.use(_.get('/login', routes.handleLogin));

    //handle register view (signup)
    server.use(_.get('/register', routes.handleRegister));

    //handle account activation (signup)
    server.use(_.get('/auth/:token', routes.handleActivation));

    //handle search view
    server.use(_.get('/search/:query', routes.handleSearch));

    //handle user (settings)
    server.use(_.get('/user/:username', routes.handleSettings));

    //handle group view
    server.use(_.get('/:group/:page', routes.handleGroup));

    //handle group view
    server.use(_.get('/:group', routes.handleGroup));

    //handle thread view
    server.use(_.get('/:group/t/:threadID', routes.handleThread));

  }

  //log number of active requests
  logRequests() {
    console.log(`Active Requests: ${this.activeRequests}`);
  }

  //go go server & db connection
  start () {
    connect();
    this.server.listen(this.port);
  }

}

export default Server;
