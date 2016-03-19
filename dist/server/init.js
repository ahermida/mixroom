'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numCPUs = exports.db = undefined;

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//connects to DB
//database driver
var MongoClient = _mongodb2.default.MongoClient;

//function to connect to DB -- default parameters
//to get numCPUs
/**
 * dartboard initialization -- DB & Metadata
 */

function connect() {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(_config2.default.MongoDB_URI, function (err, db) {
      err ? reject(err) : resolve(db);
    });
  });
}

//export DB as promise
var db = exports.db = connect();
console.log('Connected to db');

//get numCPUs -- (require syntax to make things simple)
var numCPUs = exports.numCPUs = process.env.PROCESSES || _os2.default.cpus().length;