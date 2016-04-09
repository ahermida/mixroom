'use strict';

require('babel-polyfill');

var _app = require('./server/app.js');

var _app2 = _interopRequireDefault(_app);

var _config = require('./server/config.js');

var _config2 = _interopRequireDefault(_config);

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create New Server


//Import DB Connection
function runServer(options) {
  var server = new _app2.default(options);
  server.start();
  return server;
}

//Metadata object
/**
 *  sudopost server.js -- serves webpages
 *  @author Albert Hermida
 *  - es6 modules "use strict"; by default
 */

//polyfill for generator
var meta = {};
meta.failedInstances = 0;
meta.requestsServed = 0;
meta.numCPUs = _config2.default.numCPUs;

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
  (function () {

    //All processes
    var processes = [];

    //Set Master Cluster -- Important to note -- cluster.settings
    _cluster2.default.setupMaster();

    //spin up new clusters proportional to numCPUs -->
    for (var i = 0; i < _config2.default.numCPUs; i++) {
      var fork = _cluster2.default.fork();

      //push process id into processes
      processes.push(fork.process.pid);
    }

    /**
     * Log Requests From Cluster
     */
    _cluster2.default.on('message', function (msg) {
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

    //set up user interface
    var rl = _readline2.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    //timestamp
    var date = new Date();
    //get hour
    var hour = date.getHours() % 12 + ':' + date.getMinutes() + (date.getHours() <= 12 ? 'AM' : 'PM');
    //Log start
    console.log('Server started at: ' + hour + ' on ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());

    //create prompt
    console.log('You can type: "exit" or "quit" to shut down the app.\nType: "stats" to get info about the server.');

    var getLine = function getLine() {
      rl.question('Command: ', function (answer) {
        if (answer == 'exit' || answer == 'quit') {
          process.exit(0);
        }
        if (answer == 'stats') {

          //Log metadata
          console.log('\nCPU cores: ' + meta.numCPUs + '\nRequests served: ' + meta.requestsServed + '\nFailed instances: ' + meta.failedInstances);

          //Log Processes
          console.log('Master ID: ' + process.pid + '\nWorker IDs: ' + processes.join(','));
        }
        getLine();
      });
    };

    getLine();
  })();
} else {

  /**
   * Spin up new Server if not cluster master
   */
  var server = runServer(_config2.default);
}