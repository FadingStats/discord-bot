// Start of "Purge" Command
exports.run = async (client, message) => {
  const messageTotal = parseInt(100);

  message.channel
    .fetchMessages({ limit: messageTotal })
    .then(messages => message.channel.bulkDelete(messages));

  console.log(
    `${message.author.username} has wiped the ${message.channel.name} channel!`,
  );
};
// End of "Purge" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clear"],
  permLevel: 10,
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "purge",
  description: "Clears the current channel the command is executed in.",
  usage: "purge [number (2-100)]",
};
// End of Misc.
