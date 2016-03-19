'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = require('./init.js');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//filesystem for serving template
/**
 * routes.js -- Handler functions for enpoints
 */

var routes = {}; //route object that will be exported

//Escape Content in JSON
//DB represented as resolved promise
function encodeHTML(str) {
  var buf = [];
  for (var i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};

//Render Content -- Returns Error or Resolved promise
function render(content, data) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(__dirname + '/../../assets/template/index.html', { 'encoding': 'utf8' }, function (err, layout) {
      if (err) reject(err);
      var html = layout.replace('{{{body}}}', content).replace('{{{data}}}', encodeHTML(JSON.stringify(data)));
      resolve(html);
    });
  });
};

//handle '/' route
routes.handleFP = regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return new Promise(function (resolve, reject) {
            content = "<h1>Hello World!</h1>";
            data = { bingo: "bongo" };
            render(content, bingo).then(function (html) {
              return resolve(html);
            }).catch(function (err) {
              return console.log(err);
            });
          });

        case 2:
          this.body = _context.sent;

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
});

//handle '/:group' route
routes.handleGroup = regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
});

//handle '/:group/:threadID' route
routes.handleThread = regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, this);
});

//handle '/login' route
routes.handleLogin = regeneratorRuntime.mark(function _callee4() {
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, this);
});

//handle '/register' route
routes.handleRegister = regeneratorRuntime.mark(function _callee5() {
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, this);
});

//handle '/search/:query' route
routes.handleSearch = regeneratorRuntime.mark(function _callee6() {
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee6, this);
});

//handle '/user/:username' route
routes.handleSettings = regeneratorRuntime.mark(function _callee7() {
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, this);
});

exports.default = routes;