/**
 * group.js is a controller for group (kinda)
 */

import {getGroup, getGroupInfo, getPopular, getAuth} from '../ajax/groups.js';
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

async function checkAuth(group) {
  try {
    let res = await getAuth(group);
    let resp = res.json();
    return resp;
  } catch (e) {
    //this happens when a group doesn't exist
    return;
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

  let popular;
  try {
    let res = await getPopular(0);
    let jres = await res.json();
    //get array of threads
    popular = jres.posts;
  } catch (e) {
    console.log(e);
  }

  let info;
  try {
    let res = await getGroupInfo(group);
    let jres = await res.json();
    info = jres;
  } catch(e) {
    console.log(e);
  }

  //setup user so we can determine which buttons to render on each post
  let user = {
    owned: appstore.owned,
    user: appstore.user,
    auth: auth
  };

  let utils = {
    deleteThread: deleteThread,
    saveThread: save,
    unsaveThread: unsave,
    checkAuth: checkAuth
  };

  let data = {
    info: info,
    popular: popular,
    threads: threads
  };

  //group administrator ? -> group settings link
  //pass threads, along with thread actions
  //thread actions: save thread, delete ?, nav to thread
  const grp = new view(group, data, user, page, utils);
  grp.render();
  return grp;
}
