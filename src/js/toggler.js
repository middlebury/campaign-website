import { $$ } from './utils';

class Toggler {
  constructor(elem) {
    this.elem = elem;
    this.target = this.getTarget(this.elem);

    this.activeClass = 'is-toggled';
    this.enabledClass = 'has-toggler';

    this.handleElemClick = this.handleElemClick.bind(this);

    this.init();
  }

  init() {
    if (!this.target) {
      return;
    }

    this.addListeners();
    this.elem.classList.add(this.enabledClass);
    this.target.classList.add(this.enabledClass);
  }

  addListeners() {
    this.elem.addEventListener('click', this.handleElemClick);
    this.elem.addEventListener('keydown', this.handleElemKeyDown);
  }

  handleElemKeyDown = (e) => {
    if(e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      this.toggle();
    }
  }

  handleElemClick = (e) => {
    e.preventDefault();
    this.toggle();
  }

  getTarget(elem) {
    const selector = elem.getAttribute('data-toggle-target');
    const target = document.querySelector(selector);
    return target;
  }

  open(elem, target) {
    if(target) {
      target.classList.add(this.activeClass);
    }

    if(elem) {
      elem.classList.add(this.activeClass);
      this.setAriaExpanded(elem, true);
    }
  }

  setAriaExpanded(elem, state) {
    if(elem.hasAttribute('aria-expanded')) {
      elem.setAttribute('aria-expanded', String(state));
    }
  }

  close(elem, target) {
    if(target) {
      target.classList.remove(this.activeClass);
    }

    if(elem) {
      elem.classList.remove(this.activeClass);
      this.setAriaExpanded(elem, false);
    }
  }

  isToggled(elem) {
    return elem.classList.contains(this.activeClass);
  }

  toggle() {
    if(!this.isToggled(this.target)) {
      return this.open(this.elem, this.target);
    }
    this.close(this.elem, this.target);
  }
}

const togglers = $$('[data-toggle-target]');

togglers.forEach((elem) => new Toggler(elem));

export default Toggler;