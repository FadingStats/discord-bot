// Start of Constants
const { RichEmbed } = require("discord.js");
const { caseNumber } = require("../storage/caseNumber.js");
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Warn" Command.
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  const modLog = client.channels.find("id", settings.moderationLogsChannel);
  const caseNum = await caseNumber(client, modLog);
  if (!modLog)
    return message.reply("I cannot find the moderation-log channel!");
  if (message.mentions.users.size < 1)
    return message
      .reply("You must mention someone to warn them.")
      .catch(console.error);
  const reason =
    args.splice(1, args.length).join(" ") ||
    `Awaiting moderator's input. Use ${settings.prefix}reason ${
      caseNum
    } <reason>`;
  const embed = new RichEmbed()
    .setColor(0x00ae86)
    .setTimestamp()
    .setDescription(
      `**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${
        message.author.tag
      }\n**Reason:** ${reason}`,
    )
    .setFooter(`Case ${caseNum}`);
  return client.channels.get(modLog.id).send({ embed });
};
// End of "Warn" Command.

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["w"],
  permLevel: 1,
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "warn",
  description: "Issues a warning to the mentioned user.",
  usage: "warn [mention] [reason]",
};
// End of Misc.
