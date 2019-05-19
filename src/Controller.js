import EventEmitter from './helpers/index';

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
    this.view.on('load:window', () => this.model.fetchData(model));
    this.model.on('data:fetched:final', () => this.onFetch());
    this.view.on('get:id', id => this.addItem(id));
    this.model.on('set:item', () => this.addCurrentItem());
  }

  onFetch() {
    const { items } = this.model.getItems();
    this.view.addItems(items);
  }

  addItem(id) {
    this.model.setCurrentItem(id);
  }

  addCurrentItem() {
    const item = this.model.getCurrentItem();
    this.view.addItem(item);
  }
}
