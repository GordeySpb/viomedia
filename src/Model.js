import EventEmitter from './helpers/index';
import UnsplashAPI from './API/unsplashAPI';

export default class Model extends EventEmitter {
  constructor() {
    super();
    this.state = {
      items: null,
      item: null,
    };
    this.unsplashAPI = new UnsplashAPI();

    this.on('data:fetched', data => {
      this.setItems(data);
      this.emit('data:fetched:final');
    });
  }

  setItems(data) {
    const items = [...data];
    this.state = { items };
  }

  getItems() {
    return this.state;
  }

  fetchData() {
    this.unsplashAPI
      .getPhoto()
      .then(result => this.emit('data:fetched', result));
  }

  setCurrentItem(itemId) {
    const item = this.state.items.find(({ id }) => id === itemId);
    this.state = { ...this.state, item };
    this.emit('set:item');
  }

  getCurrentItem() {
    return this.state.item;
  }
}
