'use strict';

require('babel-polyfill');

var _init = require('./server/init.js');

var _app = require('./server/app.js');

var _app2 = _interopRequireDefault(_app);

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create New Server
/**
 *  dartboard server -- serves webpages
 *  @author Albert Hermida
 *  - es6 modules "use strict"; by default
 */

//polyfill for generator
function runServer(options) {
  var server = new _app2.default(options);
  server.start();
  return server;
}

//Metadata object


//Import DB Connection, numCPUs
var meta = {};
meta.failedInstances = 0;
meta.requestsServed = 0;
meta.numCPUs = _init.numCPUs;

// Log Error & Stats on uncaught exception
process.on('uncaughtException', function (err) {

  console.log('Caught exception', err, err.stack);

  //Manage failure
  console.log('\nFailed with: {\n' + meta.failedInstances + ' failed instances\n}');

  //fail --> exit
  process.exit();
});

/**
 *  Manage Clusters
 */
if (_cluster2.default.isMaster) {

  //All processes
  var processes = [];

  //Set Master Cluster -- Important to note -- cluster.settings
  _cluster2.default.setupMaster();

  //spin up new clusters proportional to numCPUs -->
  for (var i = 0; i < _init.numCPUs; i++) {
    var fork = _cluster2.default.fork();

    //push process id into processes
    processes.push(fork.process.pid);
  }

  /**
   * Log Requests From Cluster
   */
  _cluster2.default.on('message', function (message) {
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      meta.requestsServed++;
    }
  });

  /**
   *  Handle Worker Failure
   */
  _cluster2.default.on('exit', function (worker, code, signal) {
    if (meta.failedProcesses < 30) {

      //if worker fails -- restart new one & log dead one
      console.log('Worker pid: ' + worker.process.pid + ' failed -- restarting.');

      //spin up the new one & add to failed number
      var _fork = _cluster2.default.fork();
      meta.failedProcesses++;
    } else {

      //Quit if there are over 30 process failures
      console.log('30 workers failed -- shutting down. -- worker pid:' + worker.process.pid);
      process.exit();
    }
  });

  //Log Processes
  console.log('Master ID: ' + process.pid + '\nWorker IDs: ' + processes.join(','));
} else {

  /**
   * Spin up new Server if not cluster master
   */
  var server = runServer({ port: 8080 });
}