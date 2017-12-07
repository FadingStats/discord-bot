// Start of Constants
const { RichEmbed } = require("discord.js");
const { caseNumber } = require("../storage/caseNumber.js");
const { parseUser } = require("../storage/parseUser.js");
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Mute" Command
exports.run = async (client, message, args) => {
  message.delete().catch(O_o => {});
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find("name", "moderation-log");
  const caseNum = await caseNumber(client, modlog);
  const muteRole = client.guilds
    .get(message.guild.id)
    .roles.find("name", "Silenced");
  if (!modlog)
    return message
      .reply("I cannot find a moderation-logs channel")
      .catch(console.error);
  if (!muteRole)
    return message.reply("I cannot find a silenced role").catch(console.error);
  if (message.mentions.users.size < 1)
    return message
      .reply("You must mention someone to mute them.")
      .catch(console.error);
  const reason =
    args.splice(1, args.length).join(" ") ||
    `Awaiting moderator's input. Use ${settings.prefix}reason ${
      caseNum
    } <reason>.`;

  const embed = new RichEmbed()
    .setColor(0x00ae86)
    .setTimestamp()
    .setDescription(
      `**Action:** Un/mute\n**Target:** ${user.tag}\n**Moderator:** ${
        message.author.tag
      }\n**Reason:** ${reason}`
    )
    .setFooter(`Case ${caseNum}`);

  if (
    !message.guild
      .member(client.user)
      .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
  )
    return message
      .reply("I do not have the correct permissions.")
      .catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild
      .member(user)
      .removeRole(muteRole)
      .then(() => {
        client.channels
          .get(modlog.id)
          .send({ embed })
          .catch(console.error);
      });
  } else {
    message.guild
      .member(user)
      .addRole(muteRole)
      .then(() => {
        client.channels
          .get(modlog.id)
          .send({ embed })
          .catch(console.error);
      });
  }
};
// End of "Mute" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unmute"],
  permLevel: 0
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "mute",
  description: "Mute's or Un-mute's a mentioned user",
  usage: "un/mute [mention] [reason]"
};
// End of Misc.
