// Start of Constants
const {parseUser} = require('../storage/parseUser.js');
const settings = require('../storage/settings.json');
// End of Constants

// Start of "Kick" Command
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  const reason = args.slice(1, args.length).join(" ");
  parseUser(message, user);
  message.guild.member(user).kick({
    reason: `${reason}`
  });
  message.channel.send(`The member ${user.username} has been kicked with the reason ${reason}!`);
};
// End of "Kick" Command

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k"],
  permLevel: 1
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user',
  usage: 'kick [mention] [reason]'
};
