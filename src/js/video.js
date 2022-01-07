import {decodeHtml, on, $, $$} from './utils';

class VideoSwap {
  constructor(elem) {
    this.elem = elem;
    this.content = $('.js-video-content', elem);
    this.link = $('.js-video-link', elem);
    this.iframe = elem.getAttribute('data-video');

    this.activeClass = 'has-video';

    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    if(this.link) {
      console.log(this.link);
      on(this.link, 'click', this.handleVideoEmbedClick);
      on(this.link, 'keydown', this.handleKeyUp);
    }
  }

  showVideo() {
    this.elem.classList.add(this.activeClass);

    if(!this.iframe) {
      console.warn('No data-video set for video', this.elem);
      return;
    }

    const html = decodeHtml(this.iframe);
    
    if (this.content) {
      console.log(this.content);
      this.content.innerHTML = html || this.iframe;
    }
  }

  handleKeyUp = (e) => {
    if(e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      this.showVideo();
    }
  };

  handleVideoEmbedClick = (e) => {
    e.preventDefault();
    this.showVideo();
  };
}

const elem = $$('.js-video');
console.log(elem);
elem.forEach((elem) => new VideoSwap(elem));

export default VideoSwap;