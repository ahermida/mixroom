/**
 * dom template helpers
 */

import { threadLength } from '../ajax/threads.js';
import oembed from './oembed.js';
import { getContext } from './helpers.js';
import parser from './parser';

/**
 * Nav View Templates
 */

//get template for either user logged in or not logged in
function getUserMenu(user){
  if (user.anonymous) {
    return `
      <a href="/register" class="nostylelink">
        <li id="TopNav-menu-signup" data-type="signup" class="TopNav-menu-dropdown-row ddtop">
            <span id="dd-icon-signup" class="icon icon-book ddicon">
            </span>
            <span class="ddtext">Register for an account</span>
        </li>
      </a>
      <a href="/login" class="nostylelink">
        <li id="TopNav-menu-login" data-type="login" class="TopNav-menu-dropdown-row">
            <span id="dd-icon-login" class="icon icon-book-open ddicon">
            </span>
            <span class="ddtext">Log in to your account</span>
        </li>
      </a>
      `;
   } else {
     return`
       <li id="TopNav-menu-username" data-type="user" class="TopNav-menu-dropdown-row ddtop">
         <span id="dd-icon-user" class="icon icon-cog ddicon">
         </span>
         <span class="ddtext">${user.username}</span>
       </li>
       <span id="TopNav-dropdown-logout">logout</span>
       `;
   }
}

//generate Menu groups --> should only
function getMenuGroups(groups) {
  return groups.auto.map(group => `
       <li data-type="group" data-group="${group}" class="TopNav-menu-dropdown-row">
          <span class="icon ddgroup-icon">G</span>
          <span data-group="${group}" class="ddgroup-description">
            <span data-group="${group}" class="ddgroup">${group}</span>
            ${groups.descriptions[group]}
          </span>
  		 </li>`).join('');
}

//generate Menu
export function generateMenu(user, groups) {
  //show menu -- submenu simply has class hide
  return `
    <ul id="TopNav-menu-list" class="dropdown">
			${getUserMenu(user)}
      <li class="listsection"></li>
      ${getMenuGroups(groups)}
      <li class="listsection"></li>
      <li id="TopNav-menu-secret" data-type="more" class="TopNav-menu-dropdown-row">
        <span id="dd-icon-secret" class="icon icon-comment ddicon"></span>
        <span class="ddtext">More</span>
        <span id="TopNav-dropdown-down" data-type="more" class="icon icon-down-open-big"></span>
      </li>
      <ul id="TopNav-menu-secretmenu" class="dropdown hide">
        <li id="TopNav-menu-about" data-type="about" class="TopNav-menu-dropdown-row ddnested">
          <span id="dd-icon-about" class="icon icon-info ddicon"></span>
          <span class="ddtext">About</span>
        </li>
        <li id="TopNav-menu-privacy" data-type="privacy" class="TopNav-menu-dropdown-row ddnested">
          <span id="dd-icon-privacy" class="icon icon-chat ddicon"></span>
          <span class="ddtext">Privacy</span>
        </li>
        <li id="TopNav-menu-faq" data-type="faq" class="TopNav-menu-dropdown-row ddnested">
          <span id="dd-icon-faq" class="icon icon-help ddicon">
          </span>
          <span class="ddtext">How do I use this?</span>
        </li>
      </ul>
      <li id="TopNav-menu-relevant" data-type="rules" class="TopNav-menu-dropdown-row">
        <span id="dd-icon-relevant" class="icon icon-check ddicon"></span>
        <span class="ddtext">Rules for Posting</span>
      </li>
    </ul>
  `;
}

//cut off the lenght of thread id so it doesn't cover the whole screen
export function cutoff(sendTo) {
  if (sendTo.length > 10) {
    return `${sendTo.substring(0, 12)}...`;
  }
}

export function generateWriter(groups, usernames, to) {
  //set all of the groups as options
  const getTopOptions = (groups) => {
    return groups.map((grp) => `<option>${grp}</option>`).join(" ");
  };

  //set usernames as options
  const getUsernames = (usernames) => {
    return usernames.map((username) => `<option>${username}</option>`).join(" ");
  };

  //show post submission form
  const writer = `
    <div id="TopNav-writer-top">
      <span id="TopNav-writer-save" class="icon icon-left-open-big DTReaction"></span>
      <span id="TopNav-writer-head">new post</span>
      <span id="TopNav-writer-cancel" class="icon icon-cancel DTReaction"></span>
    </div>
    <div id="TopNav-writer-link">
      <input placeholder="submit a link (or don't)" id="TopNav-writer-link-box"/>
      <span id="TopNav-writer-content">
        <label id="TopNav-writer-submit-label" for="TopNav-writer-content-submit">
          <span id="TopNav-writer-submit-icon" class="icon icon-camera"></span>
          <input id="TopNav-writer-content-submit" type="file"/>
        </label>
      </span>
    </div>
    <div id="TopNav-writer-main">
      <textarea id="TopNav-writer-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Write something here"></textarea>
    </div>
    <div id="TopNav-writer-identity">
      <span>posting as</span>
      <select id="TopNav-writer-identity-select"><option>Anonymous</option>${getUsernames(usernames)}</select></span>
    </div>
    <div id="TopNav-writer-foot">
      <span id="TopNav-writer-group">Posting to:
        <select id="TopNav-writer-select">
        <option>${to != '' ? cutoff(to) : getContext()}
        </option>${getTopOptions(groups)}
        </select></span>
      <span id="TopNav-writer-send">send</span>
    </div>
  `;

  return writer;
}


/**
 *  Group View Templates
 */

//creates a post's html
export async function generatePost(group, post, user) {
  const timestamp = post.created;
  const postID = post.id;
  const owned = Object.keys(user.owned);

  let filledpost = `
    <div data-type="post" id="${postID}" class="Post">
      <header class="Header">
      ${generatePostHeader(group, post.author, timestamp)}
      </header>
      <div class="Content">
      ${await generateContent(post.content, post.contentType)}
      </div>
      <div class="Body">
      ${generateBody(post)}
      </div>
      <footer class="Footer">
      ${generatePostFooter(post, owned)}
      </footer>
    </div>
  `;
  return filledpost;
}

//generate a *popular* section post
export async function generatePopularPost(post, user) {
  const timestamp = post.created;
  const postID = post.id;
  const owned = Object.keys(user.owned);

  let poppost = `
    <div data-type="post" id="${postID}" class="PopularPost">
      <header class="Header">
      ${generatePopularPostHeader(post.group, post.author, timestamp)}
      </header>
      <div data-type="content" class="Content">
      ${await generateContent(post.content, post.contentType)}
      </div>
      <div data-type="body" class="Body">
      ${generateBody(post)}
      </div>
      <footer class="Footer">
      ${generatePopFooter(post.size, post.thread, postID, user.user.anonymous, owned)}
      </footer>
    </div>
  `;

  return poppost;
}

//creates a head post's html given we have the data
export async function generateHeadPost(thread, user) {
  const post = thread.head;
  const threadID = thread.thread;
  const timestamp = thread.created;
  const postID = post.id;
  const ownedThreads = Object.keys(user.owned);

  let headpost = `
    <div data-type="post" id="${threadID}" class="HeadPost">
      <header class="Header">
      ${generatePostHeader(thread.group, post.author, timestamp)}
      </header>
      <div data-type="content" class="Content">
      ${await generateContent(post.content, post.contentType)}
      </div>
      <div data-type="body" class="Body">
      ${generateBody(post)}
      </div>
      <footer class="Footer">
      ${await generatePostHeadFooter(thread.size, threadID, postID, user.user.anonymous, ownedThreads)}
      </footer>
    </div>
  `;

  return headpost;
}

export function generateTimestamp(timestamp) {
  //create & format timestampstring
  let ampm = '';
  let time = new Date(timestamp); // timestamp in minutes
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let minutesString = (minutes < 10) ? `0${minutes}` : `${minutes}`
  let hour = ((hours % 12) == 0) ? 12 : hours % 12;
  hours <= 12 ? ampm = 'am' : ampm = 'pm';
  let now = new Date();
  let date = '';
  if (time.getDate() != now.getDate()) {
    date = [time.getMonth() + 1, time.getDate()].join('/');
  }
  let yr = time.getFullYear();
  let fullyr = now.getFullYear() === yr ?  "" : `${yr}`.slice(2,4);
  //formatted timestamp
  return `${hour}:${minutesString}${ampm} ${date} ${fullyr}`;
}

//generate the header for a post --> don't show replies if head
function generatePostHeader(group, author, created) {
  //title for each of the posts, replies should be overflow-x
  return `
    <div class="Head-content">
      <span class="Head-left">
        <span data-type="author" class="Head-author">${author}</span>
        -
        <a data-type="group" class="Head-group">${group}</a>
        -
        <span data-type="timestamp" class="Head-created">${generateTimestamp(created)}</span>
      </span>
      <span class="Head-rm">
        <span data-type="hide" class="icon-down-open-big"></span>
      </span>
    </div>
  `;
}

//generate the header for a post --> don't show replies if head
function generatePopularPostHeader(group, author) {
  //title for each of the posts, replies should be overflow-x
  return `
    <div class="Head-content">
      <span class="Head-left">
        <a data-type="group" class="Head-group">${group}</a>
      </span>
      <span class="Head-right">
        <span data-type="author" class="Head-author">${author}</span>
      </span>
    </div>
  `;
}

//return html content section --> video or img
async function generateContent(content, contentType) {
  if (!content || contentType == "") return "";
  let html;
  if (contentType === 'link') {
    html = `<div data-type="content" class="Content-frame">${await oembed(content)}</div>`
  } else {
    //treat video and images differently
    if (contentType.split('/')[0] === 'video') {
      html = `
      <video data-type="content" controls="controls" muted class="Content-iv">
        <source src="${content}" type="${contentType}">
      </video>`;
    } else if (contentType == "text") {
      html = `<h4 data-type="content" class="Content-text">${content}</h4>`
    } else {
      html = `<div data-type="content" class="Content-frame"><img class="Content-frame" src="${content}"></div>`;
    }
  }

  //if all works out, return proper html
  return `<div data-type="content" class="Content-wrapper">${html}</div>`;
}

//handle body of post
function generateBody(post) {
  let str = post.body;
  let author = post.author;

  //generate string
  if (str) {
    str = parser(str, author);
  } else {
    str = '';
  }

  //finally get body string...
  return str;
}

function generateDelete(postId, owned) {
  for (let i = 0; i < owned.length; i++) {
    if (postId === owned[i]) {
      return '<span data-type="delete" class="Footer-right-delete space">delete</span>';
    }
  }
  return '<span data-type="report" class="report space">report</span>';
}


//handle footer of thread post (head)
async function generatePostHeadFooter(size, threadid, postid, anonymous, owned) {
  let length = size;
  let footer = `
  <div class="Footer-content">
    <span class="Footer-left">
      <span class="icon-chat Footer-left-icon"></span>
      <span class="Footer-left-size">${length || 0} ${length != 1 ? 'posts' : 'post'}</span>
    </span>
    <span class="Footer-right" data-post="${postid}" data-thread="${threadid}">
      ${anonymous ? '' : '<span data-type="save" class="Footer-right-save">save</span>'}
      ${generateDelete(postid, owned)}
      <span data-type="reply" class="Footer-right-reply space">reply</span>
      <span data-type="open" class="Footer-open space">open</span>
    </span>
  </div>
  `;
  return footer;
}

//handle footer of thread post (head)
function generatePopFooter(size, threadid, postid, anonymous, owned) {
  let length = size;
  let footer = `
  <div class="Footer-content">
    <span class="Footer-left">
      <span class="icon-chat Footer-left-icon"></span>
      <span class="Footer-left-size">${length || 0} ${length != 1 ? 'posts' : 'post'}</span>
    </span>
    <span class="Footer-right" data-post="${postid}" data-thread="${threadid}">
      <span data-type="reply" class="Footer-right-reply space">reply</span>
      <span data-type="open" class="Footer-open space">open</span>
    </span>
  </div>
  `;
  return footer;
}

//handle footer of thread post (head)
function generatePostFooter(post, owned) {
  let replies = post.replies.length;
  let postid = post.id;

  //might make calls in here later -> that's why it's a function
  let footer = `
  <div class="Footer-content">
    <span class="Footer-left">
      <span class="icon-chat Footer-left-icon"></span>
      <span class="Footer-left-size">${replies} replies</span>
    </span>
    <span class="Footer-right" data-post="${postid}">
      ${generateDelete(postid, owned)}
      <span data-type="reply" class="Footer-right-reply space">reply</span>
    </span>
  </div>
  `;
  return footer;
}
