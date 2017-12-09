// Start of Constants
const { RichEmbed } = require("discord.js");
const { caseNumber } = require("../storage/caseNumber.js");
const { parseUser } = require("../storage/parseUser.js");
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Mute" Command
exports.run = async (client, message, args) => {
  message.delete().catch(console.error);

  if (args.length !== 1) {
    return message.author.send([
      "ERROR: Not enough arguments",
      "Usage: `!mute <@mention>`",
    ]);
  }

  const user = message.mentions.users.first();
  parseUser(message, user);
  const modLog = client.channels.find("id", settings.moderationLogsChannel);

  const caseNum = await caseNumber(client, modLog);
  let muteRole = client.guilds
    .get(message.guild.id)
    .roles.find("name", settings.silencedRoleName);

  if (!modLog)
    return message
      .reply("I cannot find a moderation-logs channel")
      .catch(console.error);

  if (!muteRole) {
    muteRole = client.guilds
      .createRole(settings.silencedRoleName)
      .then(role => console.log(`Created role ${role}`))
      .catch(console.error);
  }

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
      }\n**Reason:** ${reason}`,
    )
    .setFooter(`Case ${caseNum}`);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    return message.guild
      .member(user)
      .removeRole(muteRole)
      .then(() => {
        client.channels
          .get(modLog.id)
          .send({ embed })
          .catch(console.error);
      });
  }

  return message.guild
    .member(user)
    .addRole(muteRole)
    .then(() => {
      client.channels
        .get(modLog.id)
        .send({ embed })
        .catch(console.error);
    });
};
// End of "Mute" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unmute"],
  permLevel: 1,
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "mute",
  description: "Mute's or Un-mute's a mentioned user",
  usage: "un/mute [mention] [reason]",
};
// End of Misc.
