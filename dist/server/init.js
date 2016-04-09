'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;
exports.connect = connect;

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//get MongoDB URI

//connects to DB
/**
 * init.js
 * sudopost initialization -- DB & Metadata
 * pool db connections for each worker as render is query-intensive
 */

var MongoClient = _mongodb2.default.MongoClient;

//will hold DB connection
//database driver
var db = exports.db = void 0;

//function to connect to DB
function connect() {
  exports.db = db = new Promise(function (resolve, reject) {
    MongoClient.connect(_config2.default.MongoDB_URI, function (err, db) {
      err ? reject(err) : resolve(db);
    });
  });
}