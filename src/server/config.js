/**
 * config.js
 * Holds MongoDB URI, Port, numCPUs, and Secret for JWT
 */
import os from 'os';

const config = {
  mongoDB_URI: "mongodb://localhost:27017/sudopost",
  port: process.env.PORT || '8080',
  numCPUs: process.env.PROCESSES || os.cpus().length,
  test: false
}

export default config;
