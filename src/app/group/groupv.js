/**
 * groupv.js is the view for the group
 */
import { $id, $on } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generateHeadPost } from '../core/template.js';
//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(threads, auth) {

    //event.keyCode code for enter is 13
    const ENTER_KEY = 13;
    this.threads = threads;
    console.log(this.generateStaticView(this.threads));
     //setup commands for view actions
 		this.viewCommands = {
 		};
 	}

  //binds events --> mostly delegated events up in here
  bind() {

  }

  //generate html
  generateStaticView(threads, auth) {
    const getposts = async () => {
      let promises = threads.map(thread => generateHeadPost(thread));
      let results = await Promise.all(promises);
      return results.join('');
    };

    const buildView = async () => {
      //main header
      const header = `
        <div>
        </div>
      `;
      //wrapper for listing
      const list = `
      <div class="List">
      ${await getposts()}
      </div>
      `;

      //pagination controls
      const footer = `
      <div>
        <a onclick="router.navigate('/random/')"></a>
        <a onclick="router.navigate('/bored/')"></a>
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
    let tmp = this.generateStaticView(this.threads);
    tmp.then(tmp => $id('main').innerHTML = tmp);
  }
}
