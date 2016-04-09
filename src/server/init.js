/**
 * init.js
 * sudopost initialization -- DB & Metadata
 * pool db connections for each worker as render is query-intensive
 */

import mongodb from 'mongodb'; //database driver
import config from './config.js'; //get MongoDB URI


//connects to DB
let MongoClient = mongodb.MongoClient;

//will hold DB connection
export let db;

//function to connect to DB
export function connect() {
  db = new Promise((resolve, reject) => {
    MongoClient.connect(config.MongoDB_URI,
    (err, db) => {
      err ? reject(err) : resolve(db);
    });
  });
}
