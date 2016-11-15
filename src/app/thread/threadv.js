/**
 * groupv.js is the view for the group
 */
import { $id, $on, qs } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generatePost, generateTimestamp, generatePopularPost, generateTools } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';
import {handler, default as term} from '../term.js';
import Listing from '../core/listing.js';
import Writer from '../core/writer.js';

//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(thread, user, actions, socket, data) {

    //set thread
    this.thread = thread;

    //unpack actions onto our class
    this.removePost = actions.removePost;
    this.editPost = actions.editPost;
    this.handleSubmit = actions.handleSubmit;
    this.handleUpload = actions.handleUpload;

    //set auth
    this.user = user;

    this.popular = data.popular;

    //setup commands for view actions
    this.viewCommands = {
      goBack: e => this._goBack(e),
      toggleNM: e => this._toggleNM(e),
      toggleDM: e => this._toggleDM(e),
      openDirectly: e => this._openDirectly(e),
      toggleListSize: e => this._toggleListSize(e)
    };

    //save a ref to app-container (so if we need to switch nightmode we can)
    this.$container = $id('app-container');
    this.$main = $id('Main');

    //bring in list to render
    this.listing = new Listing(true, this.thread.posts, this.thread.group, this.user);
    this.writer = new Writer(true, this.user.user.usernames, this.group);

    //lets us render posts added post initial-render properly
    this.authors = {};

    //bind socket
    socket.connection.onmessage = event => {
      let message = JSON.parse(event.data).body;
      this.listing.addPost(message);
    }
 	}

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $prev = $id('prevpage');
    let $popular = $id('Poplisting');
    let $previouspg = $id('previous-pg');
    let $nightmode = $id('nightmode');
    let $devmode = $id('devmode');
    let $listsizetoggle = $id('List-size-switch');

    //bind handlers
    $on($popular, 'click', this.listing.handlePostClick.bind(this.listing), false);
    $on($prev, 'click', this.viewCommands.goBack.bind(this), false);
    $on($nightmode, 'click', this.viewCommands.toggleNM.bind(this), false);
    $on($devmode, 'click', this.viewCommands.toggleDM.bind(this), false);
    $on($previouspg, 'click', this.viewCommands.goBack.bind(this), false);
    $on($listsizetoggle, 'change', this._toggleListSize.bind(this), false);

    //bind listing & writer
    this.listing.bind();
    this.writer.bind();
  }

  _toggleListSize(e) {
    $id('Main-container').classList.toggle('threadenlarge');
    e.stopPropagation();
  }

  _goBack(e) {
    router.back();
  }

  _toggleNM(e) {
    this.$container.classList.toggle('nightmode');
    e.target.classList.toggle('Tools-selected');
  }

  _toggleDM(e) {
    this.$container.classList.toggle('devmode');
    e.target.classList.toggle('Tools-selected');
    let termMount = $id('term');

    //if there's no terminal mounted, mount it.
    if (!termMount.firstChild) {
      term.open($id('term'));
      handler(term);
    }

    if (this.$container.classList.contains('devmode')) {
      term.fit();
    }
  }

  _toggleInputSize(e) {
    e.target.parentNode.classList.toggle('Writer-fs');
    e.target.parentNode.classList.contains('Writer-fs') ? e.target.textContent = '–' : e.target.textContent = '+';
    $id('writer-input').focus();
  }

  _prevPage(e) {
    if (page <= 1) router.navigate(this.group);
    router.navigate(`${this.group}${--page}`);
  }

  _nextPage(e) {
    router.navigate(`${this.group}${++page}`);
  }

  //generate html
  generateStaticView(thread) {

    const getpopularposts = async () => {
      let promises = this.popular.map(post => generatePopularPost(post, this.user));
      let results = await Promise.all(promises);
      return results.join('');
    };

    const buildView = async () => {

      //wrapper for listing
      const list = await this.listing.generateStaticView();

      //generate writer
      const writer = this.writer.generateStaticView();

      //pagination controls
      const footer = `
      <div class="Main-Footer">
       <a class="Main-Footer-btn mobile" id="prevpage" href="javascript:;">back</a>
      </div>
      `;

      //desktop view information --> popular posts and stuff like that
      const popularInfo = `
        <div id="Poplisting" class="desktop">
          <div class="PopularList">
            <span id="Poplisting-title">
              Popular Today
            </span>
            <span id="Poplisting-title-label">replies</span>
            ${await getpopularposts()}
          </div>
          <div class="Mixroom-info" >
            <span><a href="static/placeholder.html">Terms</a></span>
            <span><a href="static/placeholder.html">Privacy</a></span>
            <span><a href="static/placeholder.html">Advertise</a></span>
          </div>
        </div>
      `;

      const tools = generateTools(true,
                                  this.$container.classList.contains('nightmode'),
                                  this.$container.classList.contains('devmode'));

      //user object
      const user = this.user.user;

      const listingHeader = `
        <div id="Main-listing-header" class="desktop unselectable">
          <div class="Main-listing-group unselectable">Thread Posts
          <label id="List-size-switch" class="rb-switcher">
            <input type="checkbox">
            <i></i>
          </label></div>
        </div>
        `;

      //final template for section
      return `
        <div id="Main-container">
          ${listingHeader}
          ${popularInfo}
          ${writer}
          ${tools}
          ${list}
          ${footer}
        </div>
        `;
    };

    return buildView();
  }

  //bake html into view
  render() {
    let that = this;
    let tmp = this.generateStaticView(this.thread);
    tmp.then(tmp => {
      $id('main').innerHTML = tmp;
      that.bind();
    });
  }
}
