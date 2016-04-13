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
