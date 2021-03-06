/**
 * routes.js -- Handler functions for enpoints -- must let that = this for shared client code
 */

import { db } from './init.js'; //DB represented as resolved promise
import fs from 'fs'; //filesystem used for serving templates
import path from 'path'; //helps manipulate filepaths
import parse from 'co-busboy'; //handle multipart form data
import uid from 'node-uuid'; //make unique id's
import request from 'koa-request'; //koa request wrapper for oembed
import gm from 'gm'; //graphics magick

//set up imagemagick
gm.subClass({imageMagick: true})

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

//Render bakes content & data into HTML template -- Returns Error or Resolved promise (with doc)
function render(content, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../../assets/template/index.html`, {'encoding': 'utf8'}, function (err, layout) {
      if (err) reject(err);
      const html = layout.replace('{{{body}}}', content).replace('{{{data}}}', encodeHTML(JSON.stringify(data)));
      resolve(html);
    });
  });
}

function legalFmt(extension) {
  const ext = extension.toLowerCase()
  let match = false;
  const legal = ['.webm', '.mp4', '.gif', '.png', '.jpeg', '.jpg', '.mov', '.m4v'];
  legal.forEach(item => {
    if (ext === item) {
      match = true;
    }
  });
  return match;
}

//handle '/' route
routes.handleFP = function*() {
  this.body = yield new Promise((resolve, reject) => {
    let that = this;
    //do funky DB calls and stuff in here
    let content = `<h1 class="spinny"><span class="spinny-vinny">¯\_ツ_/¯</span></h1>`; //get content by running client-side JS
    let data = { bingo: 'bongo' };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/:group' route
routes.handleGroup = function*(group) {
  this.body = yield new Promise((resolve, reject) => {
    let that = this;
    //do funky DB calls and stuff in here
    let content = `<h1 class="spinny"><span class="spinny-vinny">¯\_ツ_/¯</span></h1>`; //get content by running client-side JS
    let data = { bingo: 'bongo' };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/:group/:threadID' route
routes.handleThread = function*(group, threadID) {
  this.body = yield new Promise((resolve, reject) => {
    let that = this;
    //do funky DB calls and stuff in here
    let content = `<h1 class="spinny"><span class="spinny-vinny">¯\_ツ_/¯</span></h1>`; //get content by running client-side JS
    let data = { bingo: 'bongo' };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/login' route -- [Static] for simplicity
routes.handleLogin = function*() {
  this.body = yield new Promise((resolve, reject) => {
    let that = this;
    fs.readFile(`${__dirname}/../../assets/template/login.html`, {'encoding': 'utf8'}, function (err, layout) {
      if (err) reject(err);
      resolve(layout);
    });
 });
};

//handle '/register' route -- [Static] for simplicity
routes.handleRegister = function*() {
  this.body = yield new Promise((resolve, reject) => {
    let that = this;
    fs.readFile(`${__dirname}/../../assets/template/register.html`, {'encoding': 'utf8'}, function (err, layout) {
      if (err) reject(err);
      resolve(layout);
    });
 });
};

//handle '/search/:query' route
routes.handleSearch = function*(query) {
  this.body = yield new Promise((resolve, reject) => {
    let that = this;
    //do funky DB calls and stuff in here
    let content = `<h1 class="spinny"><span class="spinny-vinny">¯\_ツ_/¯</span></h1>`; //get content by running client-side JS
    let data = { bingo: 'bongo' };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/user/:username' route
routes.handleSettings = function*(username) {
  this.body = yield new Promise((resolve, reject) => {
    let that = this;
    //do funky DB calls and stuff in here
    let content = `<h1 class="spinny"><span class="spinny-vinny">¯\_ツ_/¯</span></h1>`; //get content by running client-side JS
    let data = { bingo: 'bongo' };
    render(content, data).then(html => resolve(html)).catch(err => console.log(err));
 });
};

//handle '/auth/:token' route
routes.handleActivation = function*() {
  this.body = yield new Promise((resolve, reject) => {
    let that = this;
    fs.readFile(`${__dirname}/../../assets/template/activate.html`, {'encoding': 'utf8'}, function (err, layout) {
      if (err) reject(err);
      resolve(layout);
    });
 });
};

//handle '/upload' route
routes.handleUpload = function*() {
  //handle multipart form data
  let parts = parse(this, {
    autoFields: true, // saves the fields to parts.field(s)
    checkFile: function (fieldname, file, filename) {
      if (!legalFmt(path.extname(filename))) {
        var err = new Error('invalid upload type');
        err.status = 400;
        return err;
      }
    }
  });
  const uuid = uid.v1();
  let url;
  let fsurl;
  let part
  while (part = yield parts) {
    fsurl = `${__dirname}/../../static/uploads/${uuid}${path.extname(part.filename).toLowerCase()}`
    var stream = fs.createWriteStream(fsurl);
    url = `/static/uploads/${uuid}${path.extname(part.filename).toLowerCase()}`;
    part.pipe(stream);
  }

  //send back response as JSON
  let resp = JSON.stringify({
    "url": url
  });
  gm(fsurl)
  .autoOrient()
  .noProfile()
  .write(fsurl, function (err) {
    if (!err) console.log('done');
  });

  this.body = resp;
};

//handle post to '/oembed' -- really just a solution to cors
routes.handleEmbed = function*() {
  let body = this.request.body;
  let url = body.url;
  var options = {
      url: url,
      method: "GET"
  };
  //real hacky
  let response = yield request(options);

  let resp = {
    embed: response.body,
    success: response.statusCode
  };

  this.body = JSON.stringify(resp);
};

export default routes;
