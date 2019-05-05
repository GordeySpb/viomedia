import EventEmitter from './helpers';
import tempaleItems from './templates/items.hbs';
import templateItem from './templates/item.hbs';

export default class View extends EventEmitter {
  constructor() {
    super();

    this.list = document.querySelector('.list');
    this.item = document.querySelector('.info');
    this.list.addEventListener('click', e => this.getItemId(e));
  }

  addItems(items) {
    const html = tempaleItems({ items });
    this.list.innerHTML = html;
  }

  getItemId(e) {
    if (e.target.closest('li')) {
      const id = e.target.closest('li').getAttribute('data-id');
      this.emit('id', id);
    }
  }

  addItem(item) {
    const html = templateItem({ item });
    this.item.innerHTML = html;
  }
}
