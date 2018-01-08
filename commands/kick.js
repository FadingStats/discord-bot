// Start of Constants
const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../storage/caseNumber.js');
const {parseUser} = require('../storage/parseUser.js');
const settings = require('../storage/settings.json');
// End of Constants

// Start of "Kick" Command
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find("id", settings.moderationLogsChannel);
  const caseNum = await caseNumber(client, modlog);
  if(!modlog) return message.reply('I cannot find a moderation-logs channel');
  if(message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Case ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user',
  usage: 'kick [mention] [reason]'
};
