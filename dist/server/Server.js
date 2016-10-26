'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

var _koaRoute = require('koa-route');

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _init = require('./init.js');

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//easy access to json body

//allows us to mount paths
//small router by koa
//kinda like flask/express -- but with generators!
var Server = function () {

  //Initialize Routes and Server
  function Server(options) {
    (0, _classCallCheck3.default)(this, Server);


    //setup server
    var server = (0, _koa2.default)();
    this.server = server;

    //passed in -- option from config.js
    this.port = options.port;

    //keep track of active requests
    this.activeRequests = 0;

    //log requests & track active -- middleware
    server.use(_regenerator2.default.mark(function _callee(next) {
      var start, ms;
      return _regenerator2.default.wrap(function _callee$(_context) {
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
              if (!options.test) {
                process.send({ 'cmd': 'notifyRequest' });
              }

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    //set up body parser for easy-access to json
    server.use((0, _koaBodyparser2.default)());

    //  server.use(*()=> yield send(this, this.path, { root: __dirname + '/../../static' }))

    //make static folder static
    server.use((0, _koaMount2.default)('/static', _regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _koaSend2.default)(this, this.path, { root: __dirname + '/../../static' });

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    //handle front page view -- proxy for /random/ until we (I) get some metric for rating -- switches on page 1
    server.use(_koaRoute2.default.get('/', _routes2.default.handleFP));

    //handle oembed -- kind of a proxy for oembed endpoints
    server.use(_koaRoute2.default.post('/embed', _routes2.default.handleEmbed));

    //handle uploads
    server.use(_koaRoute2.default.post('/upload', _routes2.default.handleUpload));

    //handle login view
    server.use(_koaRoute2.default.get('/login', _routes2.default.handleLogin));

    //handle register view (signup)
    server.use(_koaRoute2.default.get('/register', _routes2.default.handleRegister));

    //handle account activation (signup)
    server.use(_koaRoute2.default.get('/auth/:token', _routes2.default.handleActivation));

    //handle search view
    server.use(_koaRoute2.default.get('/search/:query', _routes2.default.handleSearch));

    //handle user (settings)
    server.use(_koaRoute2.default.get('/user/:username', _routes2.default.handleSettings));

    //handle group view
    server.use(_koaRoute2.default.get('/:group/:page', _routes2.default.handleGroup));

    //handle group view
    server.use(_koaRoute2.default.get('/:group', _routes2.default.handleGroup));

    //handle thread view
    server.use(_koaRoute2.default.get('/:group/t/:threadID', _routes2.default.handleThread));
  }

  //log number of active requests


  (0, _createClass3.default)(Server, [{
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
}(); //function to connect to DB (so we don't on master process)
//handler functions for routes
//serve static routes -- /static in our case
/**
 * app.js -- Server class --> Responds to requests for Client Side Routes
 */

exports.default = Server;