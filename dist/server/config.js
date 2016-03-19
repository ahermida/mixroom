"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Config Holds MongoDB URI, Port, and Secret for JWT
 */
var config = {
  mongoDB_URI: "mongodb://localhost:27017/dartboard",
  port: process.env.PORT || '8080'
};

exports.default = config;