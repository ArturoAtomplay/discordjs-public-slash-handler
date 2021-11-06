const botEvent = require('../../structures/botEvent');

module.exports = class Ready extends botEvent {
  constructor() {
    super('ready');
  }
  /**
   * @param {import('../../structures/Client')} client
   */
  async run(client) {
    console.log(`${client.user.tag} is ready!`);

    /** @type {import('discord.js').ActivitiesOptions[]} */
    const activities = [
      {
        name: 'Hi',
        type: 'WATCHING',
      },
      {
        name: 'change this in ready.js',
        type: 'LISTENING',
      },
    ];

    let i = 0;
    setActivity(i);
    setInterval(() => {
      setActivity(i);
      i = (i + 1) % activities.length;
    }, 900000);

    function setActivity(i) {
      client.user.setActivity(activities[i].name, { type: activities[i].type });
    }

    if (process.argv.slice(2)[0] == '--devDeploy') {
      const guild = client.guilds.cache.get(client.config.guildDev);
      guild?.commands.set(client.slashCommands.map(s => s.data));
    }
  }
};
