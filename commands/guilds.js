// Start of Constants
const settings = require('../storage/settings.json');
// End of Constants

// Start of "Guilds" Command
exports.run = (client, message) => {
  if (message.channel.id !== settings.commandsChannel) {
    const botRoom = message.guild.channels.find("id", settings.commandsChannel);
    return message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  }
  message.channel.send(`= Guild List =\n\n${client.guilds.map(g => g.name).join("\n")}`, {code:'asciidoc'});
};
// End of "Guilds" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["g"],
  permLevel: 0
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "guilds",
  description: "Shows the guilds the HGVMP Bot is part of.",
  usage: "guilds OR g",
};
// End of Misc
