/**
 * dom template helpers
 */

import { threadLength } from '../ajax/thread.js';

//creates a post's html given we have the data
export function generatePost(post) {
  //For the Group View
  // type Mthread struct {
  // 	Id       bson.ObjectId `bson:"_id,omitempty" json:"-"`
  //   SId      string        `bson:"id" json:"id"`
  //   Created  time.Time     `bson:"created" json:"created"`
  //   Thread   bson.ObjectId `bson:"thread" json:"-"`
  //   ThreadId string        `bson:"threadId" json:"thread"`
  //   Head     *Post         `bson:"head" json:"head"`
  //   Group    string        `bson:"group" json:"group"`
  // }
  //
  // type Post struct {
  // Id          bson.ObjectId   `bson:"_id,omitempty" json:"-"`
  // SId         string          `bson:"id,omitempty" json:"id"`
  // Thread      bson.ObjectId   `bson:"thread,omitempty" json:"-"`
  // Created     time.Time       `bson:"created" json:"created"`
  // Author      string          `bson:"author" json:"author"`
  // AuthorId    bson.ObjectId   `bson:"authorId,omitempty" json:"-"`
  // Replies     []bson.ObjectId `bson:"replies" json:"replies"`
  // ResponseTo  []bson.ObjectId `bson:"responseTo" json:"responseTo"`
  // Content     string          `bson:"content,omitempty" json:"content"`
  // ContentType string          `bson:"contentType,omitempty" json:"contentType"`
  // Body        string          `bson:"body" json:"body"`
  // }

}

function generateTimestamp(timestamp) {
  //create & format timestampstring
  let ampm = '';
  let time = new Date(timestamp); // timestamp in minutes
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let minutesString = (minutes < 10) ? `0${minutes}` : `${minutes}`
  let hour = ((hours % 12) == 0) ? 12 : hours % 12;
  hours <= 12 ? ampm = 'AM' : ampm = 'PM';
  let now = new Date();
  let date = [time.getMonth() + 1, time.getDate()].join('/');
  let yr = time.getFullYear()
  let fullyr = now.getFullYear() === yr ? "" : yr.slice(2,4);
  //formatted timestamp
  return `${hour}:${minutesString}${ampm} ${fullyr}`;
}

function generateHead(group, author, authorId, replies, created) {

  //title for each of the posts, replies should be overflow-x
  return `
    <div class="Head-title">
      <span class="Head-title-author">${author}</span>
      -
      <a class="Head-title-group">${group}</a>
      -
      <span class="Head-title-created">${generateTimestamp(created)}</span>
      -
      <span class="Head-title-replies">
      ${replies.map(item => `<span class="Head-title-rep">${item}</span>`).join('')}
      </span>
    </div>
  `;
}

//return html content section --> video or img
function generateContent(content, contentType) {
  if (!content) return;
  let html;
  if (contentType === 'link') {
    html = `<div class="Content-iframe">${oembed(content)}</div>`
  } else {
    //treat video and images differently
    if (contentType.split('/')[0] === 'video') {
      html = `
      <video loop autoplay class="Content-iv" controls>
        <source src="${content}" type="${contentType}">
      </video>`;
    } else {
      html = `<img class="Content-img" src="${content}">`;
    }
  }

  //if all works out, return proper html
  return `<div class="Content-wrapper"><div class="Content">${html}</div></div>`;
}

//handle body of post
function generateBody(str) {
  return `<div class="Body">${parser(str)}</div>`
}

//handle footer of post
function generateFooter(thread) {
  let length;
  (async () => {
    try {
      let res = await threadLength(thread);
      let resp = await res.json();
      length = resp.size;
    } catch (e) {
      console.log(e);
    }
  })(thread);
  let footer = `
  <div class="Footer-content">
    ${}
  </div>
  `;

}
