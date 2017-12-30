// Start of Constants
const Discord = require("discord.js");
const ta = require("time-ago");
const dateformat = require("dateformat");
const settings = require("../storage/settings.json");
// End of Constants

// Start of "UserInfo" Command
exports.run = async (client, message) => {
  const botRoom = message.guild.channels.find("id", settings.commandsChannel);

  if (message.channel.id !== settings.commandsChannel) {
    message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  } else {
    const member = message.guild.member(
      message.mentions.users.first() || message.author,
    );

    const embed = new Discord.RichEmbed()
      .setTitle(`Discord profile for ${message.author.username}`)
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setDescription(
        "Interested to see how you fair against your fellow members?\n",
      )
      .setColor("#5599ff")
      .setTimestamp()
      .addField(
        "User",
        `${message.author.username}#${message.author.discriminator}`,
        true,
      )
      .addField("User ID", `${message.author.id}`, true)
      .addField(
        "Joined Discord",
        `${dateformat(
          message.author.createdAt,
          "dd mmmm yyyy hh:mm",
          true,
        )}\n${ta.ago(message.author.createdAt)}`,
        true,
      )
      .addField(
        "Joined Server",
        `${dateformat(member.joinedAt, "dd mmmm yyyy hh:mm", true)}\n${ta.ago(
          member.joinedAt,
        )}`,
        true,
      )
      .addField(
        "Role(s)",
        `${member.roles
          .filter(r => r.id !== message.guild.id)
          .map(roles => `\`${roles.name}\``)
          .join(" **|** ") || "No Roles"}`,
      )
      .setFooter(`Member #${message.guild.memberCount.toLocaleString()}`);
    message.channel.send(embed);
  }
};
// End of "UserInfo" Command

// Start of Permission System, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uinfo"],
  permLevel: 0,
};
// End of Permission System, etc.

// Start of Misc.
exports.help = {
  name: "userinfo",
  description: "Shows information of your account on our Discord Server",
  usage: "userinfo",
};
// End of Misc.
