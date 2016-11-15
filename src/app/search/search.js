/**
 * group.js is a controller for group (kinda)
 */

import {searchGroups, searchThreads, searchUsers, getGif} from '../ajax/search.js';
import {saveThread, unsaveThread} from '../ajax/user.js';
import fetch from 'isomorphic-fetch';
import appstore from '../core/store.js';
import view from './searchv.js';

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

/*    nav.removeWriter();
    let thread = e.target.parentNode.dataset.thread;
    let group = e.target.parentNode.dataset.group;
    router.navigate(`${group}t/${thread}`);*/

//init for group controller (or whatever you'd like to call it)
export default async function start(txt) {
  let users;
  try {
    let res = await searchUsers(txt);
    users = await res.json();
  } catch (e) {
    console.log(e);
  }

  let threads;
  try {
    let res = await searchThreads(txt);
    threads = await res.json();
  } catch (e) {
    console.log(e);
  }

  let groups;
  try {
    let res = await searchGroups(txt);
    groups = await res.json();
  } catch (e) {
    console.log(e);
  }

  let data = {
    threads: threads.threads,
    groups: groups.groups,
    users: users.usernames
  };

  //setup user so we can determine which buttons to render on each post
  let user = {
    owned: appstore.owned,
    user: appstore.user
  };

  //api calls that are accessible from this view
  let actions = {
    saveThread: save,
    unsaveThread: unsave,
    getGif: getGif
  };


  //initiate search view
  const search = new view(data, user, actions);
  search.render();
  return search;
}
