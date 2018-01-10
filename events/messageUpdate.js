// Start of Constants
const Discord = require("discord.js");
const settings = require("../storage/settings.json");
// End of Constants

// Start of Message Update Event
module.exports = (oldMessage, newMessage) => {
  if (oldMessage.content !== newMessage.content) {
  for (i = 0; i < settings.ignoredChannels.length; i +=1) {
    if (oldMessage.channel.id === settings.ignoredChannels[i]) {
        return;
    }
  }
    newMessage.guild.fetchAuditLogs().then(() => {
		if(oldMessage.content.length > 2048){
			oldMessage.content = 'The old message extends the character limit (1024)!';
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
		} else {
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
		}
		if(newMessage.content.length > 2048){
			newMessage.content = 'The new message extends the character limit (1024)!';
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
		} else {
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
		}
    });
  }
};
// End of Message Update Event
