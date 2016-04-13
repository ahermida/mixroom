/**
 * navView.js is the view for the navbar and app-container
 */

import {qs, $id, $on} from './helpers.js';

export default class View {
	constructor() {
		this.$title = $id('TopNav-title');
    this.$titleDown = $id('TopNav-down-icon');
    this.$pencil = $id('TopNav-post');
    this.$search = $id('TopNav-search');
    this.$menu = $id('TopNav-menu');
    this.$searchbox = $id('TopNav-searchbox-box');
    this.$searchboxBg = $id('TopNav-searchbox-bg');
    this.$searchboxExit = $id('TopNav-searchbox-exit');
    this.$searchboxClear = $id('TopNav-searchbox-clear');

		this.viewCommands = {
			showSearch: () => _showSearch(),
      clearSearch: () => _hideSearch()
		};
	}

	_showSearch() {
    //remove hide from element's classname
    this.searchboxBg.className = '';
  }

  _hideSearch() {
    //add hide to element's class
    this.searcboxBg.className = "hide"
  }

  _showWriter() {

    //element that we'll use to get the writer
    const writerMount = document.createElement('div');
    writerMount.id = "TopNav-writer-mount";

    //show post submission form
    const writer = `
      <div id="TopNav-writer-top">
        <span id="TopNav-writer-minimize" class="icon icon-minimize"></span>
        <span id="TopNav-writer-cancel" class="icon icon-cancel"></span>
      </div>
      <div id="TopNav-writer-main">
        <input id="TopNav-writer-input" placeholder="Write something here"/>
      </div>
      <div id="TopNav-writer-foot">
        <input id="TopNav-writer-link" placeholder="Paste a link here if you want (optional)"/>
      </div>
    `

  }

}
