/**
 * groupv.js is the view for the group
 */
import { $id, $on } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generateHeadPost, generatePopularPost, generateTimestamp, generateTools } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';
import {handler, default as term} from '../term.js';
import Listing from '../core/listing.js';
import Writer from '../core/writer.js';

//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(group, data, user, page, options) {

    //set group
    this.group = group;

    //set threads --> catch null threads (like when the page is empty)
    this.threads = data.threads || [];

    //set group info
    this.info = data.info;

    //set threads
    this.popular = data.popular || [];

    //set user data
    this.user = user;

    //set page
    this.page = page;

    //infinite scroll
    this.infiniteScroll = false;

    //loading more
    this.loadingMore = false;

    //if we can load more
    this.doneLoading = false;

    //scroll function reference
    this.scrollFunc = null;

    //set target post
    this.postTarget = '';

    //utility functions for thread operations
    this.getGroup = options.getGroup;
    this.saveThread = options.saveThread;
    this.unsaveThread = options.unsaveThread;
    this.deleteThread = options.deleteThread;
    this.handleSubmit = options.handleSubmit;
    this.handleUpload = options.handleUpload;

    //save a ref to app-container (so if we need to switch nightmode we can)
    this.$container = $id('app-container');
    this.$main = $id('Main');

    //set up listing (isThread, list, group, user)
    this.listing = new Listing(false, this.threads, this.group, this.user);
    this.writer = new Writer(false, this.user.user.usernames, this.group);

    //setup commands for view actions
 		this.viewCommands = {
      nextPage: (e) => this._nextPage(e),
      prevPage: (e) => this._prevPage(e),
      toggleNM: (e) => this._toggleNM(e),
      toggleDM: (e) => this._toggleDM(e)
 		};
 	}

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $prev = $id('prevpage');
    let $next = $id('nextpage');
    let $author = $id('Main-desktop-author');
    let $popular = $id('Poplisting');
    let $loadmore = $id('load-more');
    let $nightmode = $id('nightmode');
    let $devmode = $id('devmode');

    //bind handlers
    $on($popular, 'click', this.listing.handlePostClick.bind(this.listing), false);
    $on($loadmore, 'click', this._toggleLoadMore.bind(this), false);
    $on($nightmode, 'click', this.viewCommands.toggleNM.bind(this), false);
    $on($devmode, 'click', this.viewCommands.toggleDM.bind(this), false);

    //set up handlers on listing
    this.listing.bind();
    this.writer.bind();

    //set up handlers for pagination
    if ($prev) $on($prev, 'click', this.viewCommands.prevPage.bind(this), false);
    if ($next) $on($next, 'click', this.viewCommands.nextPage.bind(this), false);
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

  _toggleLoadMore(e) {

    //show little dot for a clicked option
    e.target.classList.toggle('Tools-selected');

    //hide next button
    document.getElementById('nextpage').classList.toggle('hide');
    if (this.infiniteScroll) {
      this.infiniteScroll = false;
      document.removeEventListener('scroll', this.scrollFunc, false);
    } else {
      this.scrollFunc = this._handleScroll.bind(this);
      this.infiniteScroll = true;
      $on(document, 'scroll', this.scrollFunc, false);
    }
  }

  _handleScroll(e) {
    var height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    if (!this.doneLoading && window.pageYOffset >= (height * .6 + 100 * this.page) && !this.loadingMore) {
      this._addMore(this.user, this.group, ++this.page);
      this.loadingMore = true;
      //give it a second to load more
      setTimeout(() => this.loadingMore = false, 1000);
    }
  }

  _addMore(user, group, page) {

    const getposts = async () => {
      let res = await this.getGroup(group, page);
      let jres = await res.json();
      if (!jres.threads || jres.threads.length != 30) {

        //if there are less threads than there should be, we just stop endless scroll
        this.loadingMore = true;
        this.doneLoading = true;
      }
      let promises = jres.threads.map(thread => generateHeadPost(thread, user));
      let results = await Promise.all(promises);
      return results.join('');
    };

    //wrapper for listing
    const addThem = async () => {
      let list = await getposts(page);
      let nextPage = document.createElement('div');
      nextPage.innerHTML = list;
      document.getElementById('List').appendChild(nextPage);
    }

    //put the new posts in the dom
    addThem();

  }

  _prevPage(e) {
    if (this.page <= 1) return router.navigate(this.group);
    router.navigate(`${this.group}${--this.page}`);
    console.log(this.page);
    window.scrollTo(0, 0);
  }

  _nextPage(e) {
    router.navigate(`${this.group}${++this.page}`);
    window.scrollTo(0, 0);
  }

  //generate html
  generateStaticView(threads, info, popular, user) {

    const getpopularposts = async () => {
      let promises = popular.map(post => generatePopularPost(post, user));
      let results = await Promise.all(promises);
      return results.join('');
    };

    const buildView = async () => {
      //generate listing
      const list = await this.listing.generateStaticView();

      //generate writer
      const writer = this.writer.generateStaticView();

      const listingHeader = `
      <div id="Main-listing-header" class="desktop">
        <div class="Main-listing-group">Recent Posts ${this.page > 0 ? `<span id="Main-listing-pg">[page ${this.page + 1}]</span>` : ''}</div>
      </div>
      `;

      //pagination controls
      const footer = `
      <div class="Main-Footer">
      ${this.page > 0 ? '<a class="Main-Footer-btn" id="prevpage" href="javascript:;">prev</a>' : ''}
      ${this.threads.length === 30 ? '<a class="Main-Footer-btn" id="nextpage" href="javascript:;">next</a>' : ''}
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

      const tools = generateTools(false,
                                  this.$container.classList.contains('nightmode'),
                                  this.$container.classList.contains('devmode'));

      //final template for section
      return `
        <div id="Main-container">
          ${listingHeader}
          ${popularInfo}
          ${tools}
          ${list}
          ${footer}
          ${writer}
        </div>
        `;
    };

    return buildView();
  }

  //bake html into view
  render() {
    let that = this;
    let tmp = this.generateStaticView(this.threads, this.info,this.popular, this.user);
    tmp.then(tmp => {
      $id('main').innerHTML = tmp;
      that.bind();
    });
  }
}
