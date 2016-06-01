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
 	constructor(thread, user, owned) {

    //set group
    this.thread = thread;

    //set auth
    this.user = user;

     //setup commands for view actions
 		this.viewCommands = {
      reply: e => this._reply(e),
      group: e => this._goToGroup(e),
      user: e => this._goToUser(e),
      hidePost: e => this._hidePost(e),
      showPost: e => this._showPost(e),
      report: e => this._reportPost(e),
      toggleBody: e => this._toggleBody(e),
      togglePost: e => this._togglePost(e),
      peek: e => this._peek(e),
      delete: e => this._delete(e)
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

  _delete(e) {
    /*let content = e.target.innerHTML;
    if (content === 'delete') {
      this._cancelDelete();
      e.target.innerHTML = "sure?"
      e.target.id = 'delete-pending';
      return;
    }
    let thread = e.target.parentNode.dataset.thread;
    let post = e.target.parentNode.dataset.post;
    console.log(thread);
    let match;
    let owned = Object.keys(this.user.owned);
    for (let i = 0; i < owned.length; i++) {
      if (post === owned[i]) {
        match = owned[i];
      }
    }
    console.log(match);
    if (match) this.deleteThread(thread, this.user.owned[match]);

    //reload this page (but not refresh)
    router.check();
    */
  }

  _togglePost(e) {
    //flip icon
    e.target.className = e.target.dataset.open === 'true' ? 'icon-down-open-big' : 'icon-up-open-big';

    //because it's not initialized in the dom --> switches off
    e.target.dataset.open = e.target.dataset.open === 'true' ? 'false' : 'true';

    //move up in the dom until we find the post
    let target = e.target;
    while (target.dataset.type != 'post') {
      target = target.parentNode;
    }

    //toggle post visibility
    target.classList.toggle('Post-Hide');
  }

  _cancelDelete() {
    //only one deleteable at a time
    let pending = $id('delete-pending');
    if (pending) {
      pending.innerHTML = 'delete';
      pending.id = '';
    }
  }

  _back() {
    router.back();
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
    switch (target.dataset.type) {
      case 'author':
      this._goToUser(target.textContent);
      break;
      case 'group':
      this.viewCommands.group(e);
      break;
      case 'hide':
      this.viewCommands.togglePost(e);
      break;
      case 'body':
      this.viewCommands.toggleBody(e);
      break;
      case 'report':
      //sends request off to dev server
      this.viewCommands.report(e);
      break;
      case 'save':
      //saves and unsaves posts
      this.viewCommands.savePost(e);
      break;
      case 'reply':
      //opens writer with thread as target
      this.viewCommands.reply(e);
      break;
      case 'open':
      //opens thread
      this.viewCommands.open(e);
      break;
      case 'delete':
      //deletes thread
      this.viewCommands.delete(e);
      break;
      default:
      this._cancelDelete(e);
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
