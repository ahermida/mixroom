/**
 * config.js
 * Holds MongoDB URI, Port, numCPUs, and Secret for JWT
 */
import os from 'os';

const config = {
  mongoDB_URI: "mongodb://localhost:27017/dartboard",
  port: process.env.PORT || '8080',
  numCPUs: process.env.PROCESSES || os.cpus().length
}

export default config;
