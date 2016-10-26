/*
  main.js -- entry point for the application
*/
import core from './core/core.js';
import store from './core/store.js';
import router from './router/router.js';
import {getUser} from './ajax/user.js';
import oembed from './core/oembed.js';
import parser from './core/parser.js';
import './term.js';
import './search/search.js';


//handle getting user (usernames, username) data via ajax
{
  //get user data and store it
  (async function user() {
    try {
      //attempt to get user
      let usr = await getUser();

      //in the likely case we're not logged in & have no token, return
      let usrjson = await usr.json();

      //if getting the user fails, return
      if (!usrjson) return;

      //else continue
      store.addUser(usrjson);

    } catch (err) {

      //let ourselves know if there was an error getting the user --> this happens when user doesn't exist
      return;
    }
  })();

  //bind basic UI
  core();

  //bind view for route
  router.start();
}
