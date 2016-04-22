/**
 * groupv.js is the view for the group
 */
import {$id, $on} from './helpers.js';
import oembed from '../core/oembed.js';
import parser from '../core/parser.js';

//view for posts & threads
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
