// Start of Constants
const settings = require("../storage/settings.json");
const steamGroup = require('steam-group');
const steam = require('steamidconvert')()
// End of Constants

// Start of "random" Command
exports.run = (client, message) => {
  if (message.channel.id !== settings.commandsChannel) {
    const botRoom = message.guild.channels.find("id", settings.commandsChannel);
    return message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  }
  const group = steamGroup.fromName('hgvmp');
  group.getMembers(function(err, result){
	  if(err) throw err
	  const output = result[Math.floor(Math.random() * result.length)];
	  message.guild.channels.find('name', 'announcements').send(`The winner of the 2nd Italia DLC goes to: https://steamcommunity.com/profiles/${output} Congratulations, whoever you may be ;)`);
  });
};
// End of "random" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "random",
  description: "Output a random user's name.",
  usage: "random",
};
// End of Misc.
