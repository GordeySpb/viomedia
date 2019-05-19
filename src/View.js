import EventEmitter from './helpers';

import tempaleItems from './templates/items.hbs';
import templateItem from './templates/item.hbs';

export default class View extends EventEmitter {
  constructor() {
    super();

    this.list = document.querySelector('.row');
    this.item = document.querySelector('.info');
    this.window = window;
    this.list.addEventListener('click', (e) => {
      this.getItemId(e);
      this.scrollBottom();
    });
    document.addEventListener('DOMContentLoaded', () => this.loadWindow());
  }

  loadWindow() {
    this.emit('load:window');
  }

  addItems(items) {
    const html = tempaleItems({ items });
    this.list.innerHTML = html;
  }

  getItemId({ target }) {
    if (target.tagName === 'IMG') {
      const id = target.closest('div').getAttribute('data-id');
      this.emit('get:id', id);
    }
  }

  addItem(item) {
    const html = templateItem({ item });
    this.item.innerHTML = html;
  }

  scrollBottom() {
    const {
      screen: { height },
    } = this.window;
    window.scrollTo(0, height);
  }
}
