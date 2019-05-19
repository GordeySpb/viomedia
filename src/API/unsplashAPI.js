import EventEmitter from '../helpers/index';

class UnsplashAPI extends EventEmitter {
  constructor() {
    super();
    this.APIkey =
      '5b8bff2ea344464b4a1bb1eaac126aa3ef8ea3ff25c7e5655c13b9c799c22611';
    this.url = `https://api.unsplash.com/search/photos?&query=office&per_page=9&client_id=${
      this.APIkey
    }`;
  }

  getPhoto() {
    return fetch(this.url)
      .then(res => res.json())
      .then(({ results }) => results);
  }
}

export default UnsplashAPI;
