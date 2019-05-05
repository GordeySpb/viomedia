import EventEmitter from './helpers/index';

export default class Model extends EventEmitter {
  constructor() {
    super();

    this.APIkey =
      '5b8bff2ea344464b4a1bb1eaac126aa3ef8ea3ff25c7e5655c13b9c799c22611';
    this.state = { items: [] };
    this.on('data:fetched', data => {
      this.setItems(data);
      this.emit('data:fetched:final');
    });
    this.fetchData();
  }

  setItems(data) {
    this.state.items = [...this.state.items, ...data];
  }

  getItems() {
    return this.state;
  }

  fetchData() {
    fetch(
      `https://api.unsplash.com/search/photos?&query=office&client_id=${
        this.APIkey
      }`
    )
      .then(res => res.json())
      .then(({ results }) => this.emit('data:fetched', results));
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
