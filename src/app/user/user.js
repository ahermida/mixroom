/**
 * user.js -- sets up view, and passes in data / options
 */

import {getUserInfo, getUserThreads} from '../ajax/user.js';
import {getPopular} from '../ajax/groups.js';
import {handleUpload, handleSubmit} from '../core/core.js';
import store from '../core/store.js';
import MyView from './myuserview.js';
import UserView from './userview.js';

console.log(getUserThreads);
//init for group controller (or whatever you'd like to call it)
export default async function start(username) {
  let localUser = store.user;
  let view;

  //if we are the user that we're trying to load, load that view
  if (localUser.usernames.indexOf(username) !== -1) {

    //get data
    try {

      //fetch user threads
      let getThreads = await getUserThreads();
      let userThreads = await getThreads.json();
      view = new MyView()
      //create view
    } catch(e) {

      //fail
      console.log(e);
    }

    //view = new me(username, data, options);
  } else {

    //get data
    try {
      //fetch user data
      let getUserData = await getUserInfo(username);
      let userData = await getUserData.json();
      view = new UserView();

    } catch(e) {

      //failed request so let's log what happened
      console.log(e);
    }
  }
  //view.render();
  return view;
}
