const fs = require('fs');
require('dotenv').config();
const path = require('path');
const Bot = require('./src/structures/Client');
const client = new Bot({ intents: [14335] }); // https://ziad87.net/intents for more info on intents

fs.readdirSync(path.join(__dirname, 'src/slash')).forEach(cat => {
  if (fs.lstatSync(path.join(__dirname, `src/slash/${cat}`)).isDirectory()) {
    fs.readdirSync(path.join(__dirname, `src/slash/${cat}`)).forEach(file => {
      if (file.endsWith('.js')) {
        try {
          const slashCmd = new (require(`./src/slash/${cat}/${file}`))();
          client.slashCommands.set(slashCmd.data.name, slashCmd);
        } catch (err) {
          console.error(err);
        }
      }
    });
  }
});

fs.readdirSync(path.join(__dirname, 'src/events')).forEach(cat => {
  if (fs.lstatSync(path.join(__dirname, `src/events/${cat}`)).isDirectory()) {
    fs.readdirSync(path.join(__dirname, `src/events/${cat}`)).forEach(file => {
      if (file.endsWith('.js')) {
        try {
          const event = new (require(`./src/events/${cat}/${file}`))();
          client.on(event.listening, (...args) => event.run(...args, client));
        } catch (err) {
          console.error(err);
        }
      }
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
