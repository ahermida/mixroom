/**
 * groupv.js is the view for the group
 */
import {$id, $on} from './helpers.js';
import oembed from '../core/oembed.js';

export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(threads, auth) {

    //event.keyCode code for enter is 13
    const ENTER_KEY = 13;

     //setup commands for view actions
 		this.viewCommands = {
 		};
 	}

  //binds events --> mostly delegated events up in here
  bind() {

  }

  generatePost(post) {
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

    const generateContent = (content, contentType) => {
      if (!content) return;

      if (contentType === 'link') {
        return `<div class="Content-wrapper"><div class="Content">${oembed(content)}</div></div>`
      } else {

        
        //get by contentType
        //return `<div class="Content-wrapper"><div class="Content">`
      }
    }
  }

  //generate html
  generateStaticView(threads, auth) {
    //main header
    const header = `
      <div>
    `;
    //wrapper for listing
    const list = `
    <div class="List">
    ${}
    </div>
    `;

    //final template for section
    const tmp = `
    <div id="Main-container">
      ${header}
      ${list}
    </div>
    `

  }

  //bake html into view
  render() {

  }
}
