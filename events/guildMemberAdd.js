// Start of Member Add Event
module.exports = member => {
  console.log(`${member.user.username} has joined HGVMP!`);
  
  const role = member.guild.roles.find('name', 'Member');
  member.addRole(role);
};
// End of Member Add Event
