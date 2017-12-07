// Start of "Ping" Command
exports.run = (client, message) => {
  message.delete().catch(O_o => {});
  message.channel.send("Ping?").then(msg => {
    msg.edit(
      `Pong! (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`
    );
  });
};
// End of "Ping Command"

// Start of Permission System, etc
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["p"],
  permLevel: 0
};
// End of Permission System, etc

// Start of Misc.
exports.help = {
  name: "ping",
  description: "Ping/Pong command. Test's the response time of HGVMP Bot.",
  usage: "ping"
};
// End of Misc.
