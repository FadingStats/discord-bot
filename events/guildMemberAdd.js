const Discord = require('discord.js');

// Start of Member Add Event
module.exports = member => {
  console.log(`${member.user.username} has joined HGVMP!`);
  
  const role = member.guild.roles.find('name', 'Driver');
  member.addRole(role);
  
  const welcomeChannel = member.guild.channels.find('name', 'welcome');
  const rulesChannel = member.guild.channels.find('name', 'rules');
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("New Member!")
  .setDescription(`Welcome ${member.user} to ${member.guild.name}! Be sure to read ${rulesChannel} and enjoy your stay!`)
  .setThumbnail(member.user.avatarURL);
  welcomeChannel.send({embed})
};
// End of Member Add Event
