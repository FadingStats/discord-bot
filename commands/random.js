// Start of Constants
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Random" Command
exports.run = (client, message) => {
  if (message.channel.id !== settings.commandsChannel) {
    const botRoom = message.guild.channels.find("id", settings.commandsChannel);
    return message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  }
  const members = client.users.map(x => x.id);
  const output = members[Math.floor(Math.random() * members.length)];
  const prizeWinner = client.users.get(output);
  message.channel.send(`The random member I have selected is: ${prizeWinner}`);
};
// End of "Random" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "random",
  description: "Output a random user's name.",
  usage: "random",
};
// End of Misc.
