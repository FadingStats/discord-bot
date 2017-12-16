// Start of "Purge" Command
exports.run = async (client, message) => {
  const messageTotal = parseInt(100);

  message.channel
    .fetchMessages({ limit: messageTotal })
    .then(messages => {
      message.channel.bulkDelete(messages);
      message.channel
        .send(
        `Deletion of messages successful. Including the command issued by ${message.author}.\n\nThis message will be removed shortly.`
        )
        .then(message => message.delete(5000));
      console.log(
        `Deletion of messages successful. Including the command issued by ${message.author} and the message by ${client.user.username}.`
      );
    })
    .catch(err => {
      console.log("Error while attempting to purge the channel.");
      console.log(err);
    });
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
