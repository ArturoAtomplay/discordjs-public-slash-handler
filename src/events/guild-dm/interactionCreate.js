const botEvent = require('../../structures/botEvent');

class hola extends botEvent {
  constructor() {
    super('interactionCreate');
  }
  /**
   * @param {import('discord.js').Interaction} interaction
   * @param {import('../../structures/Client')} client
   */
  async run(interaction, client) {
    if (interaction.isCommand()) {
      const slash = client.slashCommands.get(interaction.commandName);
      if (!slash) return;
      slash.run(interaction);
      /* -------------------------------------------------------------------------- */
    } else if (interaction.isButton()) {
      if (interaction.customId === 'cancelDeploySlashCommands') {
        interaction.update({ content: 'Deploy canceled', components: [] });
        /* -------------------------------------------------------------------------- */
      } else if (interaction.customId === 'deployPublicSlashCommands') {
        client.application.commands
          .set(client.slashCommands.filter(s => !s.options.private).map(s => s.data))
          .then(() => {
            interaction.update(
              `:white_check_mark: Successfully deployed ${
                client.slashCommands.filter(s => !s.options.private).size
              } public slash commands.`,
            );
          })
          .catch(err => {
            interaction.update(':x: Failed to deploy public slash commands.');
            console.error(err);
          });
      }
    }
  }
}

module.exports = hola;
