/**
 * routes.js -- Handler functions for enpoints
 */
import fs from 'fs';
let routes = {};

//handle '/' route
routes.handleFP = function*() {
  this.body = yield new Promise((resolve, reject) => {
   fs.readFile(`${__dirname}/../../assets/template/index.html`, {'encoding': 'utf8'}, function (err, data) {
     if (err) return reject(err);
     resolve(data);
   });
 });
};

//handle '/:group' route
routes.handleGroup = function*() {

};

//handle '/:group/:threadID' route
routes.handleThread = function*() {

};

//handle '/login' route
routes.handleLogin = function*() {

}

//handle '/register' route
routes.handleRegister = function*() {

}

//handle '/search/:query' route
routes.handleSearch = function*() {

}

//handle '/user/:username' route
routes.handleSettings = function*() {

}

export default routes;
