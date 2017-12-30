// Start of Constants
const settings = require("../storage/settings.json");
const Discord = require("discord.js");
// End of Constants

// Start of "Serverinfo" Command
exports.run = (client, message) => {
  if (message.channel.id !== settings.commandsChannel) {
    const botRoom = message.guild.channels.find("id", settings.commandsChannel);
    message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  } else {
    const embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL, "https://hgvmp.com")
      .setColor("#5599FF")
      .setDescription(
        `Since ${new Date(message.guild.createdAt).toUTCString()}`,
      )
      .addField(`Server Region:`, `${message.guild.region}`, true)
      .addField(`Server Users:`, `${message.member.guild.memberCount}`, true)
      .addField(
        `Text Channels:`,
        `${
          message.guild.channels.filter(c => c.type === "text").map(c => c.name)
            .length
        }`,
        true,
      )
      .addField(
        `Voice Channels:`,
        `${
          message.guild.channels
            .filter(c => c.type === "voice")
            .map(c => c.name).length
        }`,
        true,
      )
      .addField(
        `Roles:`,
        `${
          message.guild.roles
            .filter(r => r.id !== message.guild.id)
            .map(roles => `\`${roles.name}\``).length
        }`,
        true,
      )
      .addField(`Owner:`, `${message.guild.owner}`, true)
      .setThumbnail(message.guild.iconURL);
    message.channel.send({ embed });
  }
};
// End of "Serverinfo" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sinfo"],
  permLevel: 0,
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "serverinfo",
  description: "Shows information of HGVMP's Discord Server",
  usage: "serverinfo",
};
// End of Misc.
