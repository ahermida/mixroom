'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  mongoDB_URI: "mongodb://localhost:27017/dartboard",
  port: process.env.PORT || '8080',
  numCPUs: process.env.PROCESSES || _os2.default.cpus().length
}; /**
    * config.js
    * Holds MongoDB URI, Port, numCPUs, and Secret for JWT
    */


exports.default = config;