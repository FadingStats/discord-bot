// Start of Constants
const Discord = require("discord.js");
// End of Constants

// Start of Message Delete Event
module.exports = oldMessage => {
  oldMessage.guild.fetchAuditLogs().then(() => {
    // const user = logs.entries.first().executor;
    const embed = new Discord.RichEmbed()
      .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL)
      .setDescription(
        `**Message Sent by ${oldMessage.author} in ${
          oldMessage.channel
        } was deleted!**\n\n**Message:**\n${oldMessage.content}\n`,
      )
      .setThumbnail(
        "http://www.free-icons-download.net/images/full-trash-can-icon-27619.png",
      )
      .setColor("RANDOM")
      .setTimestamp();
    oldMessage.guild.channels.find("name", "moderation-log").send({ embed });
  });
};
// End of Message Delete Event
