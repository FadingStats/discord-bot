// Start of Constants
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Popcorn" Command
exports.run = (client, message) => {
  if (message.channel.id !== settings.commandsChannel) {
    const botRoom = message.guild.channels.find("id", settings.commandsChannel);
    return message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  }
  message.channel.send(message.author.toString() + " Your popcorn, sir/madam :popcorn: ");
};
// End of "Popcorn" Command

// Start of Permission System, etc
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};
// End of Permission System, etc

// Start of Misc.
exports.help = {
  name: "popcorn",
  description: "Gives you popcorn. (Don't ask Inclusive, Synplex made him.)",
  usage: "popcorn",
};
// End of Misc.
