/*
  user functions -- ajax utility functions #touchtips -- all are async functions
*/
import request from 'request';
import config from '../config.js';

//check if we're in a browser or not
const isNode = config.isNode;

//get cookie passed in by config
function getCookie(cname) {

  //cookie string from source
  let cookie = "";
  if (isNode) {
    if (that && that.headers && that.headers.cookie) {
      cookie = that.headers.cookie;
    }
  } else {
    cookie = document.cookie;
  }

  var name = cname + "=";
  var ca = cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return cookie;
}

//default expects api to be running on localhost:8000
const apihost = config.api

//get access_token from cookie
const token = getCookie('access_token');


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
    let options = {
      url: `http://${apihost}${enpoint}`,
      method: 'GET',
      headers: {
        'access_token': token
      }
    };

    //Send Request
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        error ? reject(error) : resolve(body);
      });
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
    let options = {
      url: `http://${apihost}${enpoint}`,
      method: 'GET',
      headers: {
        'access_token': token
      }
    };

    //Send Request
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        error ? reject(error) : resolve(body);
      });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      name: nm
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
   let options = {
     url: `http://${apihost}${enpoint}`,
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'access_token': token
     },
     json: true,
     body: JSON.stringify({
       thread: mthread
     })
   };

   //Send Request
   return new Promise((resolve, reject) => {
     request(options, (error, response, body) => {
       error ? reject(error) : resolve(body);
     });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      thread: mthread
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      page: page
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
   let options = {
     url: `http://${apihost}${enpoint}`,
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'access_token': token
     },
     json: true,
     body: JSON.stringify({
       username: usrname
     })
   };

   //Send Request
   return new Promise((resolve, reject) => {
     request(options, (error, response, body) => {
       error ? reject(error) : resolve(body);
     });
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
    let options = {
      url: `http://${apihost}${enpoint}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'access_token': token
      },
      json: true,
      body: JSON.stringify({
        username: usrname
      })
    };

    //Send Request
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        error ? reject(error) : resolve(body);
      });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      username: usrname
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    }
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    }
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      username: usrname,
      friend: frnd
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      username: usrname,
      friend: frnd
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      username: usrname,
      friend: frnd
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
  });
}
