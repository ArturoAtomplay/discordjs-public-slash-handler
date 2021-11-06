const { default: Collection } = require('@discordjs/collection');
const { Client } = require('discord.js');

class Bot extends Client {
  /** @param {import('discord.js').ClientOptions} clientOptions */
  constructor(clientOptions) {
    super(clientOptions);
    /** @type {Collection<string, import('./slashCommand')} */
    this.slashCommands = new Collection();
    this.config = require('../../config.js');
  }
}

module.exports = Bot;
