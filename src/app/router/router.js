/**
 * router.js helps handle clients-side routing (particularly, resolving routes)
 * --only supporting the history api
 * mostly from 'A modern JavaScript router in 100 lines' by Krasimir Tsonev
 * modded so I could use it server side & only uses history api -- it's cool
 * because it only uses regex matches to get paths
 */
import config from '../config.js';
import setup from './routes.js';
const isNode = config.isNode;

//this will be used server side for resolving routes
if (!isNode && !(window.history && history.pushState)) {
  throw new Error('History API not available')
}

//patch history api to trigger events on route change
if (!isNode){
  var pushState = history.pushState;
  window.history.pushState = function(state) {
    if (typeof window.history.onpushstate == "function") {
        window.history.onpushstate({state: state});
    }
    //create 'route' event
    var event = new CustomEvent('route');
    let applied = pushState.apply(window.history, arguments);
    document.dispatchEvent(event);
    return applied;
  }
}

function clearSlashes(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

let location = isNode ? { pathname: ''} : location;

//router object, a singleton
const router = {
  root: '/',
  rootfn: null,
  routes: [],
  callbacks: [],
  getPath: function() {
    let fragment = '';
    fragment = clearSlashes(decodeURI(window.location.pathname + window.location.search));
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
    return clearSlashes(fragment);
  },
  add: function(re, handler) {
    if(typeof re == 'function') {
        handler = re;
        re = '';
    }
    this.routes.push({ re: re, handler: handler});
    return this;
  },
  onRoot: function(callback) {
    this.rootfn = callback;
  },
  check: function(f) {
    if (window.location.pathname === '/') return this.rootfn();
    let fragment = f || this.getPath();
    for (let i = 0; i < this.routes.length; i++) {
        let match = fragment.match(this.routes[i].re);
        if (match) {
            match.shift();
            this.routes[i].handler.apply({}, match);
            return this;
        }
    }
    return this;
  },

  start: function() {
    if (isNode) return;
    // Add an event listener for 'route', navigates on route event
    this.check();
    const check = () => this.check();
    document.addEventListener("route", check);
    window.addEventListener("popstate", check)
    return this;
  },

  navigate: function(path) {
    //call registered callbacks
    this.callbacks.forEach(fn => fn(path));
    path = path ? path : '';
    history.pushState(null, null,`${this.root}${clearSlashes(path)}`);
    return this;
  },

  onNavigate: function(callback) {
    this.callbacks.push(callback);
  }
}

//initialize routes in router
setup(router);

export default router;
window.router = router;
