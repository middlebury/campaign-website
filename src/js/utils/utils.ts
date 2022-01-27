export const $ = (
  selector: string,
  elem: HTMLElement | Document = document
): any => elem.querySelector(selector);

export const $$ = (
  selector: string,
  elem: HTMLElement | Document = document
) => {
  return Array.from(elem.querySelectorAll(selector)) as HTMLElement[];
};

export const on = (
  elem: HTMLElement | Document | Window,
  eventType: string,
  cb: (...args: any[]) => void
) => elem.addEventListener(eventType, cb);

export const decodeHtml = (input: string) => {
  const e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}