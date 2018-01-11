const Discord = require('discord.js');

// Start of Member Add Event
module.exports = (member) => {
  console.log(`${member.user.username} has joined the server!`);
  
  const role = member.guild.roles.find('name', 'Driver');
  member.addRole(role);

  const welcomeChannel = member.guild.channels.find('name', 'welcome');
  const rulesChannel = member.guild.channels.find('name', 'rules');
  const questionsChannel = member.guild.channels.find('name', 'questions');
  const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('New Member!')
    .setDescription(
      `Welcome ${member.user} to ${
        member.guild.name
      }! Be sure to read ${rulesChannel}, if you have any questions be sure to check out ${questionsChannel} also. Enjoy your stay!`,
    )
    .setThumbnail(
      member.user.avatarURL ||
        'https://camo.githubusercontent.com/1d25b77d1fb7e3f24fe2ef0063effe1981cb3f9c/687474703a2f2f6973322e6d7a7374617469632e636f6d2f696d6167652f7468756d622f507572706c65332f76342f65332f39642f32332f65333964323339652d376237612d653362372d633762662d3163313630653937633238632f6d7a6c2e646e6563666b6e702e706e672f30783073732d38352e6a7067',
    );
  welcomeChannel.send({ embed }).then(function (message) {
    message.react("👋")
  });
  
};
// End of Member Add Event
