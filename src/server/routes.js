/**
 * routes.js -- Handler functions for enpoints
 */

import { db } from './init.js'; //DB represented as resolved promise
import fs from 'fs'; //filesystem for serving template

//Route object that will be exported
let routes = {};

//Escape Content in JSON
function encodeHTML(str) {
  let buf = [];
  for (let i= str.length-1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
}

//Render Content -- Returns Error or Resolved promise
function render(content, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../../assets/template/index.html`, {'encoding': 'utf8'}, function (err, layout) {
      if (err) reject(err);
      const html = layout.replace('{{{body}}}', content).replace('{{{data}}}', encodeHTML(JSON.stringify(data)));
      resolve(html);
    });
  });
}

//handle '/' route
routes.handleFP = function*() {
  this.body = yield new Promise((resolve, reject) => {
    //do funky DB calls and stuff in here
    content = "<h1>Hello World! -- FP</h1>"; //get content by running client-side JS
    data = { bingo: "bongo" };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/:group' route
routes.handleGroup = function*(group) {
  this.body = yield new Promise((resolve, reject) => {
    //do funky DB calls and stuff in here
    content = "<h1>Hello World! -- Group</h1>"; //get content by running client-side JS
    data = { bingo: "bongo" };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/:group/:threadID' route
routes.handleThread = function*(group, threadID) {
  this.body = yield new Promise((resolve, reject) => {
    //do funky DB calls and stuff in here
    content = "<h1>Hello World! -- Thread</h1>"; //get content by running client-side JS
    data = { bingo: "bongo" };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/login' route -- [Static]
routes.handleLogin = function*() {
  this.body = yield new Promise((resolve, reject) => {
    //do funky DB calls and stuff in here
    content = "<h1>Hello World! -- Login</h1>"; //get content by running client-side JS
    data = { bingo: "bongo" };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/register' route -- [Static]
routes.handleRegister = function*() {
  this.body = yield new Promise((resolve, reject) => {
    //do funky DB calls and stuff in here
    content = "<h1>Hello World! -- Register</h1>"; //get content by running client-side JS
    data = { bingo: "bongo" };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/search/:query' route
routes.handleSearch = function*(query) {
  this.body = yield new Promise((resolve, reject) => {
    //do funky DB calls and stuff in here
    content = "<h1>Hello World! -- Search</h1>"; //get content by running client-side JS
    data = { bingo: "bongo" };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/user/:username' route
routes.handleSettings = function*(username) {
  this.body = yield new Promise((resolve, reject) => {
    //do funky DB calls and stuff in here
    content = "<h1>Hello World! -- Settings</h1>"; //get content by running client-side JS
    data = { bingo: "bongo" };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

export default routes;
