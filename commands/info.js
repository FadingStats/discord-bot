// Start of "Info" Command
exports.run = async (client, message, args) => {
  const botRoom = message.guild.channels.find("name", "bot-commands");

  if (message.channel.id !== "383850372768202753") {
    message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`
    );
  } else {
    message.channel.send(
      "A long time ago in a galaxy far far away, an idea was born... HGVMP is a multiplayer modification and community for the popular trucking simulation, Euro Truck Simulator 2. Experience the life of a trucker with friends and family, delivering goods all over Europe and progressing your career with every successful delivery whilst taking in the breath-taking views along your many journies.\n\nJoin thousands of other truckers online and compete to be the best with your very own virtual company or be your own boss and go it alone!"
    );
  }
};
// End of "Info" Command

// Start of Permission System, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "information"],
  permLevel: 0
};
// End of Permission System, etc.

// Start of Misc.
exports.help = {
  name: "info",
  description: "Gives the user a brief description of what HGVMP is.",
  usage: "info"
};
// End of Misc.
