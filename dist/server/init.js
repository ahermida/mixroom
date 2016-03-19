'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numCPUs = exports.db = undefined;

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//to get numCPUs

//connects to DB
/**
 * dartboard initialization -- DB & Metadata
 */

var MongoClient = _mongodb2.default.MongoClient;

//function to connect to DB -- default parameters
//database driver
function connect(_ref) {
  var _ref$host = _ref.host;
  var host = _ref$host === undefined ? 'localhost' : _ref$host;
  var _ref$port = _ref.port;
  var port = _ref$port === undefined ? 27017 : _ref$port;
  var _ref$database = _ref.database;
  var database = _ref$database === undefined ? 'dartboard' : _ref$database;

  return new Promise(function (resolve, reject) {
    MongoClient.connect('mongodb://' + host + ':' + port + '/' + database, function (err, db) {
      err ? reject(err) : resolve(db);
    });
  });
}

//export DB as promise
var db = exports.db = connect();

//get numCPUs -- (require syntax to make things simple)
var numCPUs = exports.numCPUs = process.env.PROCESSES || _os2.default.cpus().length;