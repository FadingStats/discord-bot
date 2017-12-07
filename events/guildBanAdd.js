// Start of Guild Ban Add
module.exports = (guild, user) => {
  guild.defaultChannel.send(`${user.username} was just banned!`);
};
// End of Guild Ban Add
