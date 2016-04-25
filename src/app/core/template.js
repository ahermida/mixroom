/**
 * dom template helpers
 */

import { threadLength } from '../ajax/threads.js';
import oembed from './oembed.js';
// type Post struct {
// 	Id          bson.ObjectId   `bson:"_id,omitempty" json:"-"`
//   SId         string          `bson:"id,omitempty" json:"id"`
//   Thread      bson.ObjectId   `bson:"thread,omitempty" json:"-"`
//   Created     time.Time       `bson:"created" json:"created"`
// 	Author      string          `bson:"author" json:"author"`
//   AuthorId    bson.ObjectId   `bson:"authorId,omitempty" json:"-"`
//   Replies     []bson.ObjectId `bson:"replies" json:"replies"`
//   ResponseTo  []bson.ObjectId `bson:"responseTo" json:"responseTo"`
//   Content     string          `bson:"content,omitempty" json:"content"`
//   ContentType string          `bson:"contentType,omitempty" json:"contentType"`
//   Body        string          `bson:"body" json:"body"`
// }
//creates a post's html
export async function generatePost(group, post, user) {
  const timestamp = post.created;
  const postID = post.id;
  const owned = Object.keys(user.owned);

  let filledpost = `
    <div id="${postID}" class="Post">
      <header class="Header">
      ${generatePostHeader(group, post.author, timestamp)}
      </header>
      <div class="Content">
      ${await generateContent(post.content, post.contentType)}
      </div>
      <div class="Body">
      ${generateBody(post.body)}
      </div>
      <footer class="Footer">
      ${await generatePostFooter(post, owned)}
      </footer>
    </div>
  `;

  return filledpost;
}

//creates a head post's html given we have the data
export async function generateHeadPost(thread, user) {
  const post = thread.head;
  const threadID = thread.thread;
  const timestamp = thread.created;
  const postID = post.id;
  const ownedThreads = Object.keys(user.owned);

  let headpost = `
    <div id="${threadID}" class="HeadPost">
      <header class="Header">
      ${generatePostHeader(thread.group, post.author, timestamp)}
      </header>
      <div class="Content">
      ${await generateContent(post.content, post.contentType)}
      </div>
      <div class="Body">
      ${generateBody(post.body)}
      </div>
      <footer class="Footer">
      ${await generatePostHeadFooter(thread.size, threadID, postID, user.user.anonymous, ownedThreads)}
      </footer>
    </div>
  `;

  return headpost;
}

function generateTimestamp(timestamp) {
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
        <span class="Head-author">${author}</span>
        -
        <a class="Head-group">${group}</a>
        -
        <span class="Head-created">${generateTimestamp(created)}</span>
      </span>
      <span class="Head-rm">
        <span class="icon-down-open-big"></span>
      </span>
    </div>
  `;
}

//return html content section --> video or img
async function generateContent(content, contentType) {
  if (!content || contentType == "") return "";
  let html;
  if (contentType === 'link') {
    html = `<div class="Content-frame">${await oembed(content)}</div>`
  } else {
    //treat video and images differently
    if (contentType.split('/')[0] === 'video') {
      html = `
      <video preload="auto" controls="controls" muted class="Content-iv">
        <source src="${content}" type="${contentType}">
      </video>`;
    } else if (contentType == "text") {
      html = `<h4 class="Content-text">${content}</h4>`
    } else {
      html = `<img class="Content-img" src="${content}">`;
    }
  }

  //if all works out, return proper html
  return `<div class="Content-wrapper">${html}</div>`;
}

//handle body of post
function generateBody(str) {
  if (str) {
    return parser(str);
  } else {
    return '';
  }
}

function generateDelete(postId, owned) {
  for (let i = 0; i < owned.length; i++) {
    if (postId === owned[i]) {
      return '<span class="Footer-right-delete space">delete</span>';
    }
  }
  return '<span class="report space">report</span>';
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
      ${anonymous ? '' : '<span class="Footer-right-save">save</span>'}
      ${generateDelete(postid, owned)}
      <span class="Footer-right-reply space">reply</span>
      <span class="Footer-open space">open</span>
    </span>
  </div>
  `;
  return footer;
}

//handle footer of thread post (head)
async function generatePostFooter(post, owned) {
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
      <span class="Footer-right-reply space">reply</span>
    </span>
  </div>
  `;
  return footer;
}
