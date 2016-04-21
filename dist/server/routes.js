'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _init = require('./init.js');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _coBusboy = require('co-busboy');

var _coBusboy2 = _interopRequireDefault(_coBusboy);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _koaRequest = require('koa-request');

var _koaRequest2 = _interopRequireDefault(_koaRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//koa request wrapper for oembed

//Route object that will be exported
//handle multipart form data
//filesystem used for serving templates
/**
 * routes.js -- Handler functions for enpoints -- must let that = this for shared client code
 */

var routes = {};

//Escape Content in JSON
//make unique id's
//helps manipulate filepaths
//DB represented as resolved promise
function encodeHTML(str) {
  var buf = [];
  for (var i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
}

//Render bakes content & data into HTML template -- Returns Error or Resolved promise (with doc)
function render(content, data) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.readFile(__dirname + '/../../assets/template/index.html', { 'encoding': 'utf8' }, function (err, layout) {
      if (err) reject(err);
      var html = layout.replace('{{{body}}}', content).replace('{{{data}}}', encodeHTML((0, _stringify2.default)(data)));
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
routes.handleFP = _regenerator2.default.mark(function _callee() {
  var _this = this;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return new _promise2.default(function (resolve, reject) {
            var that = _this;
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
routes.handleGroup = _regenerator2.default.mark(function _callee2(group) {
  var _this2 = this;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return new _promise2.default(function (resolve, reject) {
            var that = _this2;
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
routes.handleThread = _regenerator2.default.mark(function _callee3(group, threadID) {
  var _this3 = this;

  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return new _promise2.default(function (resolve, reject) {
            var that = _this3;
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
routes.handleLogin = _regenerator2.default.mark(function _callee4() {
  var _this4 = this;

  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return new _promise2.default(function (resolve, reject) {
            var that = _this4;
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
routes.handleRegister = _regenerator2.default.mark(function _callee5() {
  var _this5 = this;

  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return new _promise2.default(function (resolve, reject) {
            var that = _this5;
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
routes.handleSearch = _regenerator2.default.mark(function _callee6(query) {
  var _this6 = this;

  return _regenerator2.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return new _promise2.default(function (resolve, reject) {
            var that = _this6;
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
routes.handleSettings = _regenerator2.default.mark(function _callee7(username) {
  var _this7 = this;

  return _regenerator2.default.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return new _promise2.default(function (resolve, reject) {
            var that = _this7;
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

//handle '/auth/:token' route
routes.handleActivation = _regenerator2.default.mark(function _callee8() {
  var _this8 = this;

  return _regenerator2.default.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return new _promise2.default(function (resolve, reject) {
            var that = _this8;
            //do funky DB calls and stuff in here
            var content = '<h1>Hello World! -- Activation</h1>'; //get content by running client-side JS
            var data = { bingo: 'bongo' };
            render(content, data).then(function (html) {
              return resolve(html);
            }).catch(function (err) {
              return console.log(err);
            });
          });

        case 2:
          this.body = _context8.sent;

        case 3:
        case 'end':
          return _context8.stop();
      }
    }
  }, _callee8, this);
});

//handle '/upload' route
routes.handleUpload = _regenerator2.default.mark(function _callee9() {
  var parts, uuid, url, part, stream, resp;
  return _regenerator2.default.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
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
          uuid = _nodeUuid2.default.v1();
          url = void 0;
          part = void 0;

        case 4:
          _context9.next = 6;
          return parts;

        case 6:
          if (!(part = _context9.sent)) {
            _context9.next = 12;
            break;
          }

          stream = _fs2.default.createWriteStream(__dirname + '/../../static/uploads/' + uuid + _path2.default.extname(part.filename).toLowerCase());

          url = 'http://localhost:8080/static/uploads/' + uuid + _path2.default.extname(part.filename).toLowerCase();
          part.pipe(stream);
          _context9.next = 4;
          break;

        case 12:

          //send back response as JSON
          resp = (0, _stringify2.default)({
            "url": url
          });


          this.body = resp;

        case 14:
        case 'end':
          return _context9.stop();
      }
    }
  }, _callee9, this);
});

//handle post to '/oembed'
routes.handleEmbed = _regenerator2.default.mark(function _callee10() {
  var body, url, options, response;
  return _regenerator2.default.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          body = this.request.body;
          url = body.url;
          options = {
            url: url,
            method: "GET"
          };
          _context10.next = 5;
          return (0, _koaRequest2.default)(options);

        case 5:
          response = _context10.sent;

          this.status = response.statusCode;
          this.body = response.body;

        case 8:
        case 'end':
          return _context10.stop();
      }
    }
  }, _callee10, this);
});

exports.default = routes;