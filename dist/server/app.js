'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * app.js -- Server class --> Responds to requests for Client Side Routes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

//kinda like flask/express -- but with generators!
//serve static routes -- /static in our case
//small router by koa
//handler functions for routes
//allows us to mount paths


var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaRoute = require('koa-route');

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _init = require('./init.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//function to connect to DB (so we don't on master process)

var Server = function () {

  //Initialize Routes and Server

  function Server(options) {
    _classCallCheck(this, Server);

    //setup server
    var server = (0, _koa2.default)();
    this.server = server;

    //passed in -- option from config.js
    this.port = options.port;

    //keep track of active requests
    this.activeRequests = 0;

    //log requests & track active -- middleware
    server.use(regeneratorRuntime.mark(function _callee(next) {
      var start, ms;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              start = new Date();

              this.activeRequests++;
              _context.next = 4;
              return next;

            case 4:
              ms = new Date() - start;

              this.activeRequests--;
              console.log(this.method + ' \'' + this.url + '\' -- ' + ms + ' ms');
              process.send({ 'cmd': 'notifyRequest' });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    //make static folder static
    server.use((0, _koaMount2.default)("/static", (0, _koaStatic2.default)(__dirname + '/../../static')));

    //handle front page view
    server.use(_koaRoute2.default.get('/', _routes2.default.handleFP));

    //handle uploads
    server.use(_koaRoute2.default.post('/upload', _routes2.default.handleUpload));

    //handle login view
    server.use(_koaRoute2.default.get('/login', _routes2.default.handleLogin));

    //handle register view (signup)
    server.use(_koaRoute2.default.get('/register', _routes2.default.handleRegister));

    //handle search view
    server.use(_koaRoute2.default.get('/search/:query', _routes2.default.handleSearch));

    //handle user (settings)
    server.use(_koaRoute2.default.get('/user/:username', _routes2.default.handleSettings));

    //handle group view
    server.use(_koaRoute2.default.get('/:group', _routes2.default.handleGroup));

    //handle thread view
    server.use(_koaRoute2.default.get('/:group/:threadID', _routes2.default.handleThread));
  }

  //log number of active requests


  _createClass(Server, [{
    key: 'logRequests',
    value: function logRequests() {
      console.log('Active Requests: ' + this.activeRequests);
    }

    //go go server & db connection

  }, {
    key: 'start',
    value: function start() {
      (0, _init.connect)();
      this.server.listen(this.port);
    }
  }]);

  return Server;
}();

exports.default = Server;