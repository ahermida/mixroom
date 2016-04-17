/*
  main.js -- entry point for the application
*/
import core from './core/core.js';

import store from './core/store.js';
import {getUser} from './ajax/user.js';

//init
//handle getting user (usernames, username) data via ajax
async function user() {
  try {
    //attempt to get user
    store.user = await getUser();
  } catch (err) {
    //let ourselves know if there was an error
    console.log(err);
  }
}

core();
