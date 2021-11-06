const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const slashCommand = require('../../structures/slashCommand');

class Deploy extends slashCommand {
  constructor() {
    super(
      {
        name: 'deploy',
        description: 'deploy commands.',
        options: [
          {
            name: 'in',
            description: 'where the commands will be deployed',
            type: 'STRING',
            required: true,
            choices: [
              { name: 'private', value: '1' },
              { name: 'public', value: '2' },
            ],
          },
        ],
        // for more properties, see https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandData
      },
      {
        private: true,
      },
    );
  }

  /** @param {import('discord.js').CommandInteraction} interaction */
  async run(interaction) {
    /** @type {import('../../structures/Client')} */
    const client = interaction.client;
    if (interaction.user.id !== client.config.devID) return interaction.reply('You are not the owner of this bot.');

    interaction.options.getString('in');
    switch (interaction.options.getString('in')) {
      case '1':
        interaction.reply({ content: 'Deploying commands to private...', ephemeral: true }).then(interactionRes => {
          client.guilds.cache
            .get(client.config.guildDev)
            ?.commands.set(client.slashCommands.map(s => s.data))
            .then(() => {
              interactionRes.edit({ content: 'Deployed commands to private.' });
            })
            .catch(err => {
              interactionRes.edit({ content: 'Failed to deploy commands to private.' });
              console.error(err);
            });
        });
        break;
      case '2':
        const deployButtons = new MessageActionRow().addComponents([
          new MessageButton().setCustomId('deployPrivateSlashCommands').setLabel('confirm').setStyle('DANGER'),
          new MessageButton().setCustomId('cancelDeploySlashCommands').setLabel('cancel').setStyle('PRIMARY'),
        ]);

        interaction.reply({
          content: '_are you sure you want to display the public commands this may take up to 1 hour_',
          components: [deployButtons],
          ephemeral: true,
        });

        break;
    }
  }
}

module.exports = Deploy;
