// Start of Constants
const Discord = require("discord.js");
const settings = require("../storage/settings.json");
// End of Constants

// Start of Message Update Event
module.exports = (oldMessage, newMessage) => {
  if (oldMessage.content !== newMessage.content) {
    newMessage.guild.fetchAuditLogs().then(() => {
      // const user = logs.entries.first().executor;
      const embed = new Discord.RichEmbed()
        .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL)
        .setDescription(
          `**Message Sent by ${newMessage.author} in ${
            newMessage.channel
          } was edited!**\n\n**Old MSG:**\n${
            oldMessage.content
          }\n\n**New MSG:**\n${newMessage.content}`,
        )
        .setThumbnail(
          "http://www.freeiconspng.com/uploads/pencil-web-pencil-png-pencil-icon-flat-icon-png-1.png",
        )
        .setColor("RANDOM")
        .setTimestamp();
      newMessage.guild.channels
        .find("id", settings.moderationLogsChannel)
        .send({ embed });
    });
  }
};
// End of Message Update Event
