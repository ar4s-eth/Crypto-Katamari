import Phaser from 'phaser';


let instance = null;

class EventDispatcher extends Phaser.Events.EventEmitter {
  constructor() {
    super('world');
    if (instance == null) {
      instance = this;
    }
  }
  static getInstance() {
    if (instance == null) {
      instance = new EventDispatcher();
    }
    return instance;
  }
}

module.exports = EventDispatcher 