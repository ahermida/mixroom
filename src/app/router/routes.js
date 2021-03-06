/**
  Router init function (sets up routes)

  layout:
          / --> home (pg 0 for /main/)
          /:group --> grp
          /t/:thread --> front page threads
          /:group/:page --> group view for page
          /:group/t/:thread --> thread view for group
*/

import {getAuth} from '../ajax/groups.js';
import config from '../config.js';
import grp from '../group/group.js';
import thrd from '../thread/thread.js';
import usr from '../user/user.js';
import srch from '../search/search.js';
import socket from '../socket.js';
import {nav} from '../core/core.js';
import {spinner} from '../core/helpers.js'

//group gotten when hitting '/' route
const main = config.groups.main;

//this is where views are set up
export default function setup(router) {

  //middleware for routing
  router.onNavigate((path) => {

    //leave real time connection in thread
    if (socket.inRoom) socket.leaveRoom();

    //clear view on route change --> maybe put an animation
    spinner();
  });

  //set up root handler '/'
  router.onRoot(async () => {
    router.location = 'random';
    let res = await getAuth(main);
    let resp = await res.json();
    grp(main, 0, resp);
  });

  //route for user view and settings '/user/:username'
  router.add(/user\/(.*)/, (username) => {
    router.location = 'user';
    usr(username);
    //user view
    console.log('user');
  });

  //search '/search/:search'
  router.add(/search\/(.*)/, (search) => {
    router.location = 'search';
    search = search.replace(/_/g, ' ');
    //search view
    srch(search)
    console.log('search');
  });

  //route for pagination on groups '/:group/:page'
  router.add(/(.*)\/t\/(.*)/, async (group, thread) => {
    router.location = group;
    socket.joinRoom(thread);
    group = group ? group : '/';
    let res = await getAuth(`/${group}/`);
    let resp = await res.json();
    if (!resp.allowed && group != "/404/") return;
    //setup thread view
    thrd(thread);
  });

  //route for pagination on groups '/:group/:page'
  router.add(/(.*)\/(.*)/, async (group, page) => {
    router.location = group;
    group = `/${group}/`;
    let res = await getAuth(group);
    let resp = await res.json();
    if (!resp.allowed && group != "/404/") return;

    //setup group once again -- squiggles are a string -> int type conversion
    grp(group, ~~page, resp);
  });

  //route for group (page:0) '/:group' || if integer --> pagination for FP
  router.add(/(.*)/, async (group) => {
    router.location = group;
    group = `/${group}/`;
    let res = await getAuth(group);
    let resp = await res.json();
    if (!resp.allowed && group != "/404/") return;
    //setup group
    grp(group, 0, resp);
  });
}
