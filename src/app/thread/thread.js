/**
 * group.js is a controller for group (kinda)
 */

import {getThread, rmPost, editPost} from '../ajax/threads.js';
import {getPopular} from '../ajax/groups.js';
import {handleUpload, handleSubmit} from '../core/core.js';
import appstore from '../core/store.js';
import store from './store.js';
import view from './threadv.js';
import socket from '../socket.js';

async function removePost(post, id) {
  try {
    await rmPost(post, id);
  } catch (e) {
    console.log(e);
  }
}

async function updatePost(post, content, id) {
  try {
    await editPost(threadId, content, id);
  } catch (e) {
    console.log(e);
  }
}

//init for group controller (or whatever you'd like to call it)
export default async function start(threadid) {
  try {
    let res = await getThread(threadid);
    let thread = await res.json();

    let user = {
      owned: appstore.owned,
      user: appstore.user
    };

    let pop = await getPopular(0);
    let popjson = await pop.json();
    //get array of threads
    let popular = popjson.posts;


    let actions = {
      removePost: removePost,
      handleSubmit: handleSubmit,
      handleUpload: handleUpload,
      editPost: updatePost
    };

    let data = {
      popular: popular
    };

    //in thread actions
    const thrd = new view(thread, user, actions, socket, data);
    thrd.render();
    return thrd;

  } catch (e) {
    console.log(e);
  }
}
