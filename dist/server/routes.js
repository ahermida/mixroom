'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = require('./init.js');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _coBusboy = require('co-busboy');

var _coBusboy2 = _interopRequireDefault(_coBusboy);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//make unique id's

//Route object that will be exported
//helps manipulate filepaths
//DB represented as resolved promise
var routes = {};

//Escape Content in JSON
//handle multipart form data
//filesystem used for serving templates
/**
 * routes.js -- Handler functions for enpoints
 */

function encodeHTML(str) {
  var buf = [];
  for (var i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
}

//Render bakes content & data into HTML template -- Returns Error or Resolved promise (with doc)
function render(content, data) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(__dirname + '/../../assets/template/index.html', { 'encoding': 'utf8' }, function (err, layout) {
      if (err) reject(err);
      var html = layout.replace('{{{body}}}', content).replace('{{{data}}}', encodeHTML(JSON.stringify(data)));
      resolve(html);
    });
  });
}

function legalFmt(extension) {
  var ext = extension.toLowerCase();
  var match = false;
  var legal = ['.webm', '.mp4', '.gif', '.png', '.jpeg', '.jpg', '.mov', '.m4v'];
  legal.forEach(function (item) {
    if (ext === item) {
      match = true;
    }
  });
  return match;
}

//handle '/' route
routes.handleFP = regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return new Promise(function (resolve, reject) {
            //do funky DB calls and stuff in here
            var content = '<h1>Hello World! -- FP</h1>'; //get content by running client-side JS
            var data = { bingo: 'bongo' };
            render(content, data).then(function (html) {
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
routes.handleGroup = regeneratorRuntime.mark(function _callee2(group) {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return new Promise(function (resolve, reject) {
            //do funky DB calls and stuff in here
            var content = '<h1>Hello World! -- Group: ' + group + '</h1>'; //get content by running client-side JS
            var data = { bingo: 'bongo' };
            render(content, data).then(function (html) {
              return resolve(html);
            }).catch(function (err) {
              return console.log(err);
            });
          });

        case 2:
          this.body = _context2.sent;

        case 3:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
});

//handle '/:group/:threadID' route
routes.handleThread = regeneratorRuntime.mark(function _callee3(group, threadID) {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return new Promise(function (resolve, reject) {
            //do funky DB calls and stuff in here
            var content = '<h1>Hello World! -- Group: ' + group + ', Thread: ' + threadID + '</h1>'; //get content by running client-side JS
            var data = { bingo: 'bongo' };
            render(content, data).then(function (html) {
              return resolve(html);
            }).catch(function (err) {
              return console.log(err);
            });
          });

        case 2:
          this.body = _context3.sent;

        case 3:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, this);
});

//handle '/login' route -- [Static] for simplicity
routes.handleLogin = regeneratorRuntime.mark(function _callee4() {
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return new Promise(function (resolve, reject) {
            _fs2.default.readFile(__dirname + '/../../assets/template/login.html', { 'encoding': 'utf8' }, function (err, layout) {
              if (err) reject(err);
              resolve(layout);
            });
          });

        case 2:
          this.body = _context4.sent;

        case 3:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, this);
});

//handle '/register' route -- [Static] for simplicity
routes.handleRegister = regeneratorRuntime.mark(function _callee5() {
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return new Promise(function (resolve, reject) {
            _fs2.default.readFile(__dirname + '/../../assets/template/register.html', { 'encoding': 'utf8' }, function (err, layout) {
              if (err) reject(err);
              resolve(layout);
            });
          });

        case 2:
          this.body = _context5.sent;

        case 3:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, this);
});

//handle '/search/:query' route
routes.handleSearch = regeneratorRuntime.mark(function _callee6(query) {
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return new Promise(function (resolve, reject) {
            //do funky DB calls and stuff in here
            var content = '<h1>Hello World! -- Search</h1>'; //get content by running client-side JS
            var data = { bingo: 'bongo' };
            render(content, data).then(function (html) {
              return resolve(html);
            }).catch(function (err) {
              return console.log(err);
            });
          });

        case 2:
          this.body = _context6.sent;

        case 3:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee6, this);
});

//handle '/user/:username' route
routes.handleSettings = regeneratorRuntime.mark(function _callee7(username) {
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return new Promise(function (resolve, reject) {
            //do funky DB calls and stuff in here
            var content = '<h1>Hello World! -- Settings</h1>'; //get content by running client-side JS
            var data = { bingo: 'bongo' };
            render(content, data).then(function (html) {
              return resolve(html);
            }).catch(function (err) {
              return console.log(err);
            });
          });

        case 2:
          this.body = _context7.sent;

        case 3:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, this);
});

//handle '/upload' route
routes.handleUpload = regeneratorRuntime.mark(function _callee8() {
  var parts, part, uuid, stream, resp;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:

          //handle multipart form data
          parts = (0, _coBusboy2.default)(this, {
            autoFields: true, // saves the fields to parts.field(s)
            checkFile: function checkFile(fieldname, file, filename) {
              if (!legalFmt(_path2.default.extname(filename))) {
                var err = new Error('invalid upload type');
                err.status = 400;
                return err;
              }
            }
          });

          //get part (should only be one)

          _context8.next = 3;
          return parts;

        case 3:
          part = _context8.sent;
          uuid = _nodeUuid2.default.v1();
          stream = _fs2.default.createWriteStream(__dirname + '/../../static/uploads/' + uuid);

          part.pipe(stream);

          //send back response as JSON
          resp = JSON.stringify({
            "url": 'http://localhost:8080/static/uploads/' + uuid
          });


          this.body = resp;

        case 9:
        case 'end':
          return _context8.stop();
      }
    }
  }, _callee8, this);
});

exports.default = routes;