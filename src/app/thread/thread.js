/**
 * group.js is a controller for group (kinda)
 */

import {getGroup} from '../ajax/groups.js';
import appstore from '../core/store.js'
import view from './groupv.js';

//init for group controller (or whatever you'd like to call it)
export default async function start(group, page) {
  let threads;
  try {
    let res = await getGroup(group, page);
    let jres = await res.json();
    //get array of threads
    threads = jres.threads;
  } catch (e) {
    console.log(e);
  }
  //group administrator ? -> group settings link
  //pass threads, along with thread actions
  //thread actions: save thread, delete ?, nav to thread
  const grp = new view(group, threads, appstore.user, page);
  grp.render();
  return grp;
}
