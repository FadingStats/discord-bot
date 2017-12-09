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
  const adminRole = message.guild.roles.find("name", settings.adminRoleName);

  // Has Discord Admin role
  if (adminRole && message.member.roles.has(adminRole.id)) {
    return 10;
  }

  // Has MANAGE_MESSAGES permission
  if (message.member.permissions.has("MANAGE_MESSAGES")) {
    return 1;
  }

  // Not enough permissions
  return 0;
};
// End of Elevation of Messages

// Logging into Discord API
client.login(process.env.token);
// End of Logging into Discord API
