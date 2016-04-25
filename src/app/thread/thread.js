/**
 * group.js is a controller for group (kinda)
 */

import {getThread} from '../ajax/threads.js';
import appstore from '../core/store.js'
import view from './threadv.js';

//init for group controller (or whatever you'd like to call it)
export default async function start(threadid) {
  try {
    let res = await getThread(threadid);
    let jres = await res.json();
    //get array of threads
    let thread = jres;

    let user = {
      owned: appstore.owned,
      user: appstore.user
    }

    //in thread actions
    const thrd = new view(thread, user);
    thrd.render();
    return thrd;

  } catch (e) {
    console.log(e);
  }
}
