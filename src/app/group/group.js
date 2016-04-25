/**
 * group.js is a controller for group (kinda)
 */

import {getGroup} from '../ajax/groups.js';
import {saveThread, unsaveThread} from '../ajax/user.js';
import {rmThread} from '../ajax/threads.js';
import appstore from '../core/store.js'
import view from './groupv.js';

async function deleteThread(threadId, id) {
  try {
    await rmThread(threadId, id);
  } catch (e) {
    console.log(e);
  }
}

async function save(threadId) {
  try {
    await saveThread(threadId);
  } catch (e) {
    console.log(e);
  }
}

async function unsave(threadId) {
  try {
    await unsaveThread(threadId);
  } catch (e) {
    console.log(e);
  }
}


//init for group controller (or whatever you'd like to call it)
export default async function start(group, page, auth) {
  let threads;
  try {
    let res = await getGroup(group, page);
    let jres = await res.json();
    //get array of threads
    threads = jres.threads;
  } catch (e) {
    console.log(e);
  }

  //setup user so we can determine which buttons to render on each post
  let user = {
    owned: appstore.owned,
    user: appstore.user,
    auth: auth
  }

  let options = {
    deleteThread: deleteThread,
    saveThread: save,
    unsaveThread: unsave
  }
  //group administrator ? -> group settings link
  //pass threads, along with thread actions
  //thread actions: save thread, delete ?, nav to thread
  const grp = new view(group, threads, user, page, options);
  grp.render();
  return grp;
}
