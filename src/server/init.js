/**
 * dartboard initialization -- DB & Metadata
 */

import mongodb from 'mongodb'; //database driver
import os from 'os'; //to get numCPUs
import config from './config.js';


//connects to DB
let MongoClient = mongodb.MongoClient;

//function to connect to DB -- default parameters
function connect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.MongoDB_URI,
    (err, db) => {
      err ? reject(err) : resolve(db);
    });
  });
}

//export DB as promise
export const db = connect();

//get numCPUs -- (require syntax to make things simple)
export const numCPUs = process.env.PROCESSES || os.cpus().length;
