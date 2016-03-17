'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * dartboard initialization -- DB & Metadata
 */

var numCPUs = exports.numCPUs = process.env.PROCESSES || require('os').cpus().length;
var db = exports.db = undefined;