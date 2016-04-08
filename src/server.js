/**
 *  dartboard server.js -- serves webpages
 *  @author Albert Hermida
 *  - es6 modules "use strict"; by default
 */

//polyfill for generator
import 'babel-polyfill';

//Import DB Connection
import Server from './server/app.js';
import config from './server/config.js';
import cluster from 'cluster';
import readline from 'readline';

//Create New Server
function runServer(options) {
  let server = new Server(options);
  server.start();
  return server;
}

//Metadata object
let meta = {};
meta.failedInstances = 0;
meta.requestsServed = 0;
meta.numCPUs = config.numCPUs;

// Log Error & Stats on uncaught exception
process.on('uncaughtException', err => {

  console.log('Caught exception', err, err.stack);

  //Manage failure
  console.log(`\nFailed with: {\n${meta.failedInstances} failed instances\n}`);

  //fail --> exit
  process.exit();
});


/**
 *  Manage Clusters
 */
if (cluster.isMaster) {

  //All processes
  let processes = [];

  //Set Master Cluster -- Important to note -- cluster.settings
  cluster.setupMaster();

  //spin up new clusters proportional to numCPUs -->
  for (let i = 0; i < config.numCPUs; i++) {
    let fork = cluster.fork();

    //push process id into processes
    processes.push(fork.process.pid);
  }

  /**
   * Log Requests From Cluster
   */
  cluster.on('message', msg => {
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      meta.requestsServed++;
    }
  });

  /**
   *  Handle Worker Failure
   */
  cluster.on('exit', (worker, code, signal) => {
    if (meta.failedProcesses < 30) {

      //if worker fails -- restart new one & log dead one
      console.log(`Worker pid: ${worker.process.pid} failed -- restarting.`);

      //spin up the new one & add to failed number
      let fork = cluster.fork();
      meta.failedProcesses++;

    } else {

      //Quit if there are over 30 process failures
      console.log(`30 workers failed -- shutting down. -- worker pid:${worker.process.pid}`);
      process.exit();
    }
  });

  //set up user interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  //timestamp
  let date = new Date();
  //get hour
  let hour = `${date.getHours() % 12}:${date.getMinutes()}${date.getHours() <= 12 ? 'AM' : 'PM'}`
  //Log start
  console.log(`Server started at: ${hour} on ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`);

  //create prompt
  console.log(`You can type: "exit" or "quit" to shut down the app.\nType: "stats" to get info about the server.`);

  let getLine = () => {
  rl.question('Command: ', answer => {
    if (answer == 'exit' || answer == 'quit') {
      process.exit(0)
    }
    if (answer == 'stats') {

      //Log metadata
      console.log(`\nCPU cores: ${meta.numCPUs}\nRequests served: ${meta.requestsServed}\nFailed instances: ${meta.failedInstances}`);

      //Log Processes
      console.log(`Master ID: ${process.pid}\nWorker IDs: ${processes.join(',')}`);
    }
    getLine();
    });
  };

  getLine();
} else {

  /**
   * Spin up new Server if not cluster master
   */
  let server = runServer(config);
}
