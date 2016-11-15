/**
 * helper functions for client side events
 */
import config from '../config.js';

// Don't run into any naming issues with node
if (!config.isNode) {

  // Foreach on node list
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// Get element by id
export function $id(id) {
  return document.getElementById(id);
}

// Get elements by selector
export function qs(selector) {
	return document.querySelector(selector);
}

// Get all with a given id
export function qsa(selector) {
  return document.querySelectorAll(selector)
}

// addEventListener wrapped
export function $on(target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture);
}

//get context in writer
export function getContext() {

  //if the route equals search, user, or '' --> set writer target to /random/
  const defaultRandom = [
    'search',
    'user',
    ''
  ];
  let loc = location.pathname.substring(1).split('/');
  defaultRandom.forEach(item => {
    if (loc[0] === item) {
      return '/random/';
    }
  });

  //checks for /group/t/:here <=
  if (loc[2]) {
    return 'this thread';
  } else if (loc[0]) {
    return `/${loc[0]}/`;
  }

  //if none of the above, default to /random/
  return '/random/';
}

//will add a spinner on the left of the basic list view until we render the next
export function spinner() {
  let list = $id('List');
  if (list) {
    list.style.display = "none";

    //get other items associated with it and set them to none display
    $id('Main-listing-header').style.display = "none";
    $id('Tools-menu').style.display = "none";
    let footer = document.getElementsByClassName('Main-Footer')[0];
    if (footer) {
      footer.style.display = "none";
    }
    let h1 = document.createElement('h1');
    h1.className = 'spinny';
    h1.innerHTML = `<span class="spinny-vinny">¯\_ツ_/¯</span>`;
    $id('Main-container').appendChild(h1);
  } else {
    $id('main').innerHTML = `<h1 class="spinny><span class="spinny-vinny">¯\_ツ_/¯</span></h1>"`;
  }
}
