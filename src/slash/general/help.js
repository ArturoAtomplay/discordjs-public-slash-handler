const slashCommand = require('../../structures/slashCommand');

class Help extends slashCommand {
  constructor() {
    super({
      name: 'help',
      description: 'ey this is a test interaction command.',
      // for more properties, see https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandData
    });
  }

  /** @param {import('discord.js').CommandInteraction} interaction */
  run(interaction) {
    interaction.reply('This is a test interaction command.');
  }
}

module.exports = Help;
