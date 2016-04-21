/**
 * group.js is a controller for group (kinda)
 */

import {getGroup} from '../ajax/groups.js';
import appstore from '../core/store.js'
import view from './groupv.js';

//init for group controller (or whatever you'd like to call it)
function start(group, page) {
  let threads;
  (async (group, page) => {
    try {
      let res = await getGroup(group, page);
      let jres = await res.json();
      //get array of threads
      threads = jres.threads;
    }
  })(group, page)
  //group administrator ? -> group settings link
  //pass threads, along with thread actions
  //thread actions: save thread, delete ?, nav to thread
  const group = new view(threads, auth);
  group.render();
  group.bind();
}

function getHTML(group, page) {

}
