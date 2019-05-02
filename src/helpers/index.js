class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, cb) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(cb);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach(cb => cb(arg));
    }
  }
}

export default EventEmitter;
