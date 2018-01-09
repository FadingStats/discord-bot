// Start of Constants
const {parseUser} = require('../storage/parseUser.js');
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Ban" Command
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  const reason = args.slice(1, args.length).join(" ");
  parseUser(message, user);
  message.guild.member(user).ban({
    reason: `${reason}`
  });
  message.channel.send(`The member ${user.username} has been banned with the reason ${reason}!`);
};
// End of "Ban" Command.
  
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
