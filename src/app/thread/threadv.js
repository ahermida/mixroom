/**
 * groupv.js is the view for the group
 */
import { $id, $on } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generatePost } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';

//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(thread, user) {

    //set group
    this.thread = thread;

    //set auth
    this.user = user;

     //setup commands for view actions
 		this.viewCommands = {
      reply: (e) => this._reply(e),
      group: (e) => this._goToGroup(e),
      user: (e) => this._goToUser(e),
      hidePost: (e) => this._hidePost(e),
      showPost: (e) => this._showPost(e),
      report: (e) => this._reportPost(e),
      toggleBody: (e) => this._toggleBody(e),
      peek: (e) => this._peek(e)
 		};
 	}

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $listing = $id('List');
    let $prev = $id('prevpage');

    //clicks on listing section
    $on($listing, 'click', this._onPostClick.bind(this), false);
    $on($prev, 'click', this._back.bind(this), false);
  }

  _back() {
    router.back();
  }

  _hidePost(e) {
    e.target.className = 'icon-up-open-big';
    let target = e.target.parentNode;
    while(target.className != 'Post') {
      //get post & remove the children we want
      target = target.parentNode;
    }
    Array.prototype.forEach.call(target.childNodes, node => {
      if (node.className === 'Body' || node.className === 'Content') {
        node.style.display = 'none';
      }
    });
  }

  _showPost(e) {
    e.target.className = 'icon-down-open-big';
    let target = e.target.parentNode;
    while(target.className != 'Post') {
      target = target.parentNode;
    }
    //get post & show the children we want
    Array.prototype.forEach.call(target.childNodes, node => {
      if (node.className === 'Body' || node.className === 'Content') {
        node.style.display = 'block';
      }
    });
  }

  _prevPage(e) {
    if (page <= 1) router.navigate(this.group);
    router.navigate(`${this.group}${--page}`);
  }

  _nextPage(e) {
    router.navigate(`${this.group}${++page}`);
  }

  //handle post clicks
  _onPostClick(e) {
    let target = e.target;
    switch (target.className) {
      case 'Head-author':
      if (target.textContent !== 'Anonymous') router.navigate('/user/${target.textContent}');
      break;
      case 'Head-group':
      this.viewCommands.group(e);
      break;
      case 'icon-down-open-big':
      //hacky solution to delegation tactics
      this.viewCommands.hidePost(e);
      break;
      case 'icon-up-open-big':
      //hacky solution to delegation tactics
      this.viewCommands.showPost(e);
      break;
      case 'Body':
      this.viewCommands.toggleBody(e);
      break;
      case 'report space':
      this.viewCommands.report(e);
      break;
      case 'Footer-right-save space':
      this.viewCommands.savePost(e);
      break;
      case 'Footer-right-reply space':
      this.viewCommands.reply(e);
      break;
      case 'Footer-open space':
      this.viewCommands.open(e);
      break;

    }
  }

  //reply to post
  _reply(e) {
    nav.openWriterRef(e.target.parentNode.dataset.post);
  }

  //open thread
  _open(e) {
    router.navigate(`${this.group}t/${e.target.parentNode.dataset.thread}`);
  }

  //go to group
  _goToGroup(e) {
    router.navigate(e.target.textContent);
  }

  //go to user
  _goToUser(e) {
    if (e.target.textContent !== 'Anonymous') router.navigate('/user/${e.target.textContent}');
  }

  //save post
  _savePost(e) {
    e.target.style.color = e.target.style.color === '#6879FF' ? '#6879FF' : '#3b5998';
  }

  //report post
  _reportPost(e) {
    if (e.target.textContent === 'report') return e.target.innerHTML = 'unreport';
    e.target.innerHTML = 'report';
  }

  _toggleBody(e) {
    e.target.maxHeight = e.target.maxHeight === '400px' ? '1000px' : '400px';
  }

  //generate html
  generateStaticView(thread) {
    const getposts = async () => {
      let promises = thread.posts.map(post => generatePost(thread.group, post, this.user));
      let results = await Promise.all(promises);
      return results.join('');
    };

    const buildView = async () => {
      //main header
      const header = `
        <div id="Main-Header">

        </div>
      `;
      //wrapper for listing
      const list = `
      <div id="List" class="List Thread">
      ${await getposts()}
      </div>
      `;

      //pagination controls
      const footer = `
      <div class="Main-Footer">
       <a class="Main-Footer-btn" id="prevpage" href="javascript:;">back</a>
      </div>
      `;

      //final template for section
      return `
        <div id="Main-container">
          ${header}
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
