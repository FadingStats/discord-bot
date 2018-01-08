// Start of Constants
const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../storage/caseNumber.js');
const {parseUser} = require('../storage/parseUser.js');
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Ban" Command
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find("id", settings.moderationLogsChannel);
  const caseNum = await caseNumber(client, modlog);
  if (!modlog)
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
    `**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${
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
  aliases: ["b"],
  permLevel: 1,
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "ban",
  description: "Bans the mentioned user.",
  usage: "ban [mention] [reason]",
};
// End of Misc.
