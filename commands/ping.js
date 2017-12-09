const settings = require("../storage/settings.json");

// Start of "Ping" Command
exports.run = (client, message) => {
  message.delete().catch(console.error);

  if (message.channel.id !== settings.commandsChannel) {
    const botRoom = message.guild.channels.find("id", settings.commandsChannel);
    return message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  }

  message.channel.send("Ping?").then(msg => {
    msg.edit(
      `Pong! (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`,
    );
  });
};
// End of "Ping Command"

// Start of Permission System, etc
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["p"],
  permLevel: 0,
};
// End of Permission System, etc

// Start of Misc.
exports.help = {
  name: "ping",
  description: "Ping/Pong command. Test's the response time of HGVMP Bot.",
  usage: "ping",
};
// End of Misc.
