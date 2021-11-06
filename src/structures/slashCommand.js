/**
 * @typedef {Object} slashOptions
 * @property {boolean} [private]
 */

module.exports = class slashCommand {
  /**
   * @param {import('discord.js').ApplicationCommandData} ApplicationCommandData
   * @param {slashOptions} [options]
   */
  constructor(ApplicationCommandData, options) {
    const defaultOptions = { private: false };
    this.data = ApplicationCommandData;
    this.options = { ...defaultOptions, ...options };
  }

  run() {}
};
