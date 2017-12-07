// Start of Constants
const Discord = require("discord.js");

const client = new Discord.Client({ forceFetchUsers: true });
const settings = require("./storage/settings.json");
const fs = require("fs");
const moment = require("moment");
require("./storage/eventLoader")(client);
require("dotenv").config();

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
// End of Constants

// Loading Commands
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
// End of Loading Commands

// Start of Error Handling
process.on("unhandledRejection", console.error);
// End of Error Handling

// Start of Reload Command
client.reload = command =>
  new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((fcmd, alias) => {
        if (fcmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
// End of Reload Command
// Elevation of Messages (Permission System, etc.)
client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
  is then sent to the command handler for verification */
  let permlvl = 0;
  const modRole = message.guild.roles.find("name", settings.modrolename);
  const adminRole = message.guild.roles.find("name", settings.adminrolename);

  if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;
  if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};
// End of Elevation of Messages

// Logging into Discord API
client.login(process.env.token);
// End of Logging into Discord API
