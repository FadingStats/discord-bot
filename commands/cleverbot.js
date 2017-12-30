// Start of Constants
const settings = require("../storage/settings.json");
const Cleverbot = require("cleverbot-node");

const cleverbot = new Cleverbot();
cleverbot.configure({ botapi: process.env.clever_api_key });
// End of Constants

// Start of "Cleverbot" Command
exports.run = (client, message, args) => {

  if (message.channel.id !== settings.commandsChannel) {
    const botRoom = message.guild.channels.find("id", settings.commandsChannel);
    return message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  }

  const cleverbotQuestion = args.slice(1).join(" ");
  cleverbot.write(cleverbotQuestion, response => {
    message.channel.send(`${message.author}, ${response.output}`);
  });
};
// End of "Cleverbot" Command

// Start of Permission System
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clever"],
  permLevel: 0,
};
// End of Permission System

// Start of Misc.
exports.help = {
  name: "cleverbot",
  description: "Asks cleverbot your question.",
  usage: "cleverbot <question>",
};
// End of Misc.
