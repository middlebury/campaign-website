export const $ = (selector, elem = document) => elem.querySelector(selector);

export const $$ = (selector, elem = document) => Array.from(elem.querySelectorAll(selector));

export const on = (elem, eventType, cb) => elem.addEventListener(eventType, cb);

export const decodeHtml = (input) => {
  const e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}