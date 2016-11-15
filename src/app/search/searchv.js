/**
 * groupv.js is the view for the group
 */
import { $id, $on } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generateHeadPost, generateTimestamp } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';
import Listing from '../core/listing.js';

//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(data, user, options) {

    //set users
    this.users = data.users;

    //set groups
    this.groups = data.groups;

    //set threads --> catch null threads (like when the page is empty)
    this.threads = data.threads;

    //set user data
    this.user = user;

    //utility functions for thread operations
    this.saveThread = options.saveThread;
    this.unsaveThread = options.unsaveThread;
    this.deleteThread = options.deleteThread;
    this.getGif = options.getGif;

    //save a ref to app-container (so if we need to switch nightmode we can)
    this.$container = $id('app-container');
    this.$main = $id('Main');

    //set up listing (isThread, list, group, user)
    this.listing = new Listing(false, this.threads, null, this.user);

    //setup commands for view actions
 		this.viewCommands = {
      prevPage: (e) => this._prevPage(e),
      delete: (e) => this._deletePost(e),
      togglePost: (e) => this._togglePost(e),
      toggleNM: (e) => this._toggleNM(e),
      toggleDM: (e) => this._toggleDM(e)
 		};
 	}

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $prev = $id('prevpage');
    let $listing = $id('List');
    let $previouspg = $id('previous-pg');
    let $nightmode = $id('nightmode');

    //clicks on listing sections --> reuses _onPostClick for convenience
    $on($prev, 'click', this.viewCommands.prevPage.bind(this), false);
    $on($nightmode, 'click', this.viewCommands.toggleNM.bind(this), false);
    $on($previouspg, 'click', this.viewCommands.prevPage.bind(this), false);

    //bind listing
    this.listing.bind();
  }

  _toggleNM(e) {
    this.$container.classList.toggle('nightmode');
    e.target.classList.toggle('Tools-selected');
  }

  _prevPage(e) {
    router.back();
  }

  //generate html
  generateStaticView(user, users, threads, groups) {

    const buildView = async () => {

      //wrapper for listing
      const list = `
      <div id="List" class="List">
      ${users.length ? '' : '<div class="Search-divider">No Users Found</div>'}
      ${users.map(user => `<div class="Search-group" data-type="user" data-user="${user}">${user}</div>`).join('')}
      ${groups.length ? '' : '<div class="Search-divider">No Groups found</div>'}
      ${groups.map(group => `<div class="Search-group" data-type="group" data-group="${group}">${group}</div>`).join('')}
      ${threads.length ? '' : '<div class="Search-divider">No Posts found</div>'}
      ${threads.length ? await this.listing.generatePosts() : ''}
      </div>
      `;

      //user has other info catalogued under user, particularly, usernames
      const user = this.user.user;

      const writer = `
        <div id="writer" data-to="local" class="desktop hide">
          <textarea placeholder="..." id="writer-input"></textarea>
          <div id="writer-label">new post</div>
          <div id="writer-exit" class="unselectable">^</div>
          <div id="writer-options" class="desktop hide">
            <div id="writer-link" class="writer-option"><input id="writer-link-input" placeholder="Share a link..."></div>
            <div id="writer-username" class="writer-option">posting as
              <select id="writer-username-option">
                <option>Anonymous</option>
                ${user.usernames.map(username => `<option>${username}</option>`)}
              </select>
            </div>
            <div id="writer-hide" class="writer-option">hide post</div>
          </div>
          <div id="writer-toggle">+</div>
          <span id="writer-buttons">
            <button id="writer-upload">
              <label for="writer-upload-input">
                <span id="writer-upload-text">upload</span>
                <input accept=".webm, .mp4, .gif, .png, .jpeg, .jpg, .mov, .m4v" id="writer-upload-input" class="hide" type="file">
              </label>
            </button>
            <button id="writer-send">send</button>
          </span>
        </div>
        `;

      const listingHeader = `
      <div id="Main-listing-header" class="desktop">
        <div class="Main-listing-group">All Search Results</div>
      </div>
      `;

      //pagination controls
      const footer = `
      <div class="Main-Footer">
       <a class="Main-Footer-btn mobile" id="prevpage" href="javascript:;">back</a>
      </div>
      `;


      let resetimg = async () => {
        let img = $id('rightimg');
        try {
          let res = await this.getGif();
          let resJSON = await res.json();
          let url = resJSON.data.image_url;
          img ? img.src = url : window.clearInterval(resetimg);
        } catch (e) {
          console.log(`Couldn't fetch giphy`);
        }
      }

      window.setInterval(resetimg, 5000);

      //desktop view information --> popular posts and stuff like that
      const right = `
        <div id="Poplisting" class="desktop">
          <div class="PopularList">
            <span id="Poplisting-title">...</span>
            <img id="rightimg" src="http://${window.location.host}/static/uploads/yup.gif">
          </div>
          <div class="Mixroom-info" >
            <span><a href="static/placeholder.html">Terms</a></span>
            <span><a href="static/placeholder.html">Privacy</a></span>
            <span><a href="static/placeholder.html">Advertise</a></span>
          </div>
        </div>
      `;

      const tools = `
      <div id="Tools-menu" class="desktop">
        <div id="previous-pg" class="unselectable">
          <span class="Tool-select hide">•</span>previous-pg
        </div>
        <div class="unselectable ${this.$container.classList.contains('nightmode') ? 'Tools-selected' : ''}" id="nightmode">
          <span class="Tool-select hide">•</span>night-mode
        </div>
      </div>
      `;

      //final template for section
      return `
        <div id="Main-container">
          ${listingHeader}
          ${tools}
          ${list}
          ${right}
          ${writer}
          ${footer}
        </div>
        `;
    };

    return buildView();
  }

  //bake html into view
  render() {
    let that = this;
    let tmp = this.generateStaticView(this.user, this.users, this.threads, this.groups);
    tmp.then(tmp => {
      $id('main').innerHTML = tmp;
      that.bind();
    });
  }
}
