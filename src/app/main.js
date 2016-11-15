/*
  main.js -- entry point for the application
*/
import core from './core/core.js';
import store from './core/store.js';
import router from './router/router.js';
import oembed from './core/oembed.js';
import parser from './core/parser.js';
import './term.js';
import './search/search.js';


//bind basic UI
core().then(() => router.start());
