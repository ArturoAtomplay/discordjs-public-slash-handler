module.exports = class botEvent {
  /** @param {keyof import('discord.js').ClientEvents} listening */
  constructor(listening) {
    this.listening = listening;
  }
  run() {}
};
