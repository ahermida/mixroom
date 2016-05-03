/*
  user functions -- ajax utility functions #touchtips -- all are async functions
*/
import fetch from 'isomorphic-fetch';
import config from '../config.js';
import token from './cookie.js';

//check if we're in a browser or not
const isNode = config.isNode;

//default expects api to be running on localhost:8000
const apihost = config.api

//=============================================================================
//                              /user/ Routes
//=============================================================================

/**
 * [Async] -- gets a user's data
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getUser();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function getUser() {
  let endpoint = "/user/";
  if (!token) {
    return;
  } else {
    return fetch(`http://${apihost}${endpoint}`, {
    	method: 'GET',
    	mode: 'no-cors',
    	redirect: 'error',
    	headers: new Headers({
    		'access_token': token
    	})
    });
  }
}

/**
 * [Async] -- gets a user's saved threads
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getSaved();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function getSaved() {
  let endpoint = "/user/saved";
  if (!token) {
    return;
  } else {
    return fetch(`http://${apihost}${endpoint}`, {
      method: 'GET',
      mode: 'no-cors',
      redirect: 'error',
      headers: new Headers({
        'access_token': token
      })
    });
  }
}

/**
 * [Async] -- add a name to a user's account
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await addName('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function addName(nm) {
  if (!token) {
    return;
  }
  let endpoint = "/user/name";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      name: nm
    })
  });
}

/**
 * [Async] -- save a thread for a given user
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await saveThread('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
 export function saveThread(mthread) {
   if (!token) {
     return;
   }
   let endpoint = "/user/saved";

   return fetch(`http://${apihost}${endpoint}`, {
     method: 'POST',
     mode: 'no-cors',
     redirect: 'error',
     headers: new Headers({
       'Content-Type': 'application/json',
       'access_token': token
     }),
     body: JSON.stringify({
       thread: mthread
     })
   });
 }

/**
 * [Async] -- unsave a thread for a given user
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await unsaveThread('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function unsaveThread(mthread) {
  if (!token) {
    return;
  }
  let endpoint = "/user/saved";

  return fetch(`http://${apihost}${endpoint}`, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      thread: mthread
    })
  });
}

/**
 * [Async] -- Get a user's 'feed' (reluctant to use this word)
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getUserThreads('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function getUserThreads(page) {
  if (!token) {
    return;
  }
  let endpoint = "/user/saved";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      page: page
    })
  });
}

/**
 * [Async] -- Add a username for a given user id
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await addUsername('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
 export function addUsername(usrname) {
   if (!token) {
     return;
   }
   let endpoint = "/user/username";
   return fetch(`http://${apihost}${endpoint}`, {
     method: 'POST',
     mode: 'no-cors',
     redirect: 'error',
     headers: new Headers({
       'Content-Type': 'application/json',
       'access_token': token
     }),
     body: JSON.stringify({
       username: usrname
     })
   });
 }

/**
 * [Async] -- change username for a given user id to another username
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await addUsername('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
  export function changeUsername(usrname) {
    if (!token) {
      return;
    }
    let endpoint = "/user/username";
    return fetch(`http://${apihost}${endpoint}`, {
      method: 'PUT',
      mode: 'no-cors',
      redirect: 'error',
      headers: new Headers({
        'Content-Type': 'application/json',
        'access_token': token
      }),
      body: JSON.stringify({
        username: usrname
      })
    });
  }

/**
 * [Async] -- delete username for a given user id
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await rmUsername('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function rmUsername(usrname) {
  if (!token) {
    return;
  }
  let endpoint = "/user/username";

  return fetch(`http://${apihost}${endpoint}`, {
    method: 'DELETE',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      username: usrname
    })
  });
}

/**
 * [Async] -- get notifications for a given user id
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getNotifications();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function getNotifications() {
  if (!token) {
    return;
  }
  let endpoint = "/user/notifications";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'GET',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'access_token': token
    }),
  });
}

/**
 * [Async] -- get all friends for a given user id
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getFriends();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function getFriends() {
  if (!token) {
    return;
  }
  let endpoint = "/user/friends";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'GET',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'access_token': token
    }),
  });
}

/**
  * [Async] -- add a friend
  * @example
  * async function doStuffWithThisFunc() {
  *   try {
  *     let data = await addFriend('friendname');
  *     console.log(data)
  *   } catch(error) {
  *     console.log(error);
  *   }
  * }
  */
export function addFriend(username, frnd) {
  if (!token) {
    return;
  }
  let endpoint = "/user/username";

  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      username: usrname,
      friend: frnd
    })
  });
}

/**
 * [Async] -- accept a friend request
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await acceptFriend('friendname');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function acceptFriend(username, frnd) {
  if (!token) {
    return;
  }
  let endpoint = "/user/username";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      username: usrname,
      friend: frnd
    })
  });
}

/**
 * [Async] -- unfriend
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await unfriend('friendname');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function unfriend(username, frnd) {
  if (!token) {
    return;
  }
  let endpoint = "/user/username";

  return fetch(`http://${apihost}${endpoint}`, {
    method: 'DELETE',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      username: usrname,
      friend: frnd
    })
  });
}
