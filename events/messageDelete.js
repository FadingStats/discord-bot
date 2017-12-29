// Start of Constants
const Discord = require("discord.js");
const settings = require("../storage/settings.json");
// End of Constants

// Start of Message Delete Event
module.exports = oldMessage => {
  if (oldMessage.content.startsWith(settings.prefix)) {
    const command = oldMessage.content
      .split(" ")[0]
      .slice(settings.prefix.length);
    const { client } = oldMessage;

    if (client.commands.has(command) || client.aliases.has(command)) return;
  }
  
  if(oldMessage.channel.id === '380340086543482882' & '385822064474324992' & '395684180341686272' & '385814467079831552' & '386181943726702594' & '385820799505924105' & '386130781413703690' & '385818195707166721' & '385816775498924033' & '385743542879911948' & '385816300347326476' & '386964328076804118' & '380555872105005058' & '385816995460939776'){
    return;
  }
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
    oldMessage.guild.channels
      .find("id", settings.moderationLogsChannel)
      .send({ embed });
    });
};
// End of Message Delete Event
