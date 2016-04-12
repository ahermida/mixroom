/*
  ajax utility functions #touchtips -- all are async functions
*/
import request from 'request';
import config from '../config.js';

//check if we're in a browser or not
const isNode = module !== 'undefined' && module.exports;

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
//                              /auth/ Routes
//=============================================================================

/**
 * [Async] -- creates a user
 * @example
 * async function doStuffWithThisFunc(email, username, password){
 *   try {
 *     let data = yield createUser(email, username, password);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function createUser(email, username, password) {
  let endpoint = "/auth/register";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: JSON.stringify({
      email: email,
      username: username,
      password: password
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
 * [Async] -- logs a user in
 * @example
 * async function doStuffWithThisFunc(email, password) {
 *   try {
 *     let data = yield loginUser(email, password);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function loginUser(email, password) {
  let endpoint = "/auth/login";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: JSON.stringify({
      email: email,
      password: password
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
 * [Async] -- Activates a user based on location
 * @example
 * async function doStuffWithThisFunc(location) {
 *   try {
 *     let data = yield activatUser(location);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function activateUser(location = window.location.pathname) {
  let truePath = location.substring(6);
  let endpoint = "/auth/activate";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access_token': truePath
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
 * [Async] -- Deactivate user
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = yield deactivatUser();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function deactivateUser() {
  if (!token) {
    return;
  }
  let endpoint = "/auth/remove";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'DELETE',
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
 * [Async] -- sends a recovery email to a user's account
 * @example
 * async function doStuffWithThisFunc(email) {
 *   try {
 *     let data = yield recoverUser(email);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function recoverUser(email) {
  let endpoint = "/auth/recover";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: JSON.stringify({
      email: email
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
 * [Async] -- change password to a user's account
 * @example
 * async function doStuffWithThisFunc(password, newPassword) {
 *   try {
 *     let data = yield changePass(password, newPassword);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function changePass(pass, newPass) {
  if (!token) {
    return;
  }
  let endpoint = "/auth/changepass";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      password: pass,
      newPassword: newPass
    })

  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
  });
}

//=============================================================================
//                              /user/ Routes
//=============================================================================

/**
 * [Async] -- gets a user's data
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = yield getUser();
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
 *     let data = yield getSaved();
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
 *     let data = yield addName('dingdong');
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
 *     let data = yield saveThread('dingdong');
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
 *     let data = yield unsaveThread('dingdong');
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
 *     let data = yield getUserThreads('dingdong');
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
 *     let data = yield addUsername('dingdong');
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
 *     let data = yield addUsername('dingdong');
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
 *     let data = yield rmUsername('dingdong');
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
 *     let data = yield getNotifications();
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
 *     let data = yield getFriends();
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
  *     let data = yield addFriend('friendname');
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
 *     let data = yield acceptFriend('friendname');
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
 *     let data = yield unfriend('friendname');
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

//=============================================================================
//                              /group/ Routes
//=============================================================================

//make header for request
function makeHeaders(token, json) {
  let headers = {};
  if (token) {
    headers['access_token'] = token;
  }
  if (json) {
    headers['Content-Type'] = 'application/json',
  }
  return headers;
}

/**
 * [Async] -- Get Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = yield getGroup('group', 0);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
 export function getGroup(grp, pg) {
   let endpoint = "/group/";
   let options = {
     url: `http://${apihost}${enpoint}`,
     method: 'POST',
     headers: makeHeaders(token, true),
     json: true,
     body: JSON.stringify({
       group: grp,
       page: pg
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
 * [Async] -- Make Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = yield createGroup('group', false);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function createGroup(grp, anon) {
  let endpoint = "/group/modify";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({
      group: grp,
      anonymous: anon
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
 * [Async] -- Delete Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = yield deleteGroup('group');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function deleteGroup(grp) {
  let endpoint = "/group/modify";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'DELETE',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({ group: grp })
  };
  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
     error ? reject(error) : resolve(body);
    });
  });
}

/**
 * [Async] -- Get User Auth for Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = yield deleteGroup('group');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function getAuthGroup(grp) {
  let endpoint = "/group/auth";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({
      group: grp
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
 * [Async] -- Add Admin to Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = yield addAdmin('group', 'userid');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function addAdmin(grp, usr) {
  let endpoint = "/group/modify";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({ group: grp, user: usr })
  };
  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
     error ? reject(error) : resolve(body);
    });
  });
}

/**
 * [Async] -- Remove Admin from Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = yield rmAdmin('group', 'userid');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function rmAdmin(grp, usr) {
  let endpoint = "/group/modify";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'PUT',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({ group: grp, user: usr })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
     error ? reject(error) : resolve(body);
    });
  });
}

//=============================================================================
//                              /thread/ Routes
//=============================================================================
