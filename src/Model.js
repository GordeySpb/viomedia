import EventEmitter from './helpers/index';
import UnsplashAPI from './API/unsplashAPI';

export default class Model extends EventEmitter {
  constructor() {
    super();

    this.APIkey =
      '5b8bff2ea344464b4a1bb1eaac126aa3ef8ea3ff25c7e5655c13b9c799c22611';
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
    this.state.items = [...data];
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
    this.state.item = item;
    this.emit('set:item');
  }

  getCurrentItem() {
    return this.state.item;
  }
}
