// Start of Constants
const Cleverbot = require("cleverbot-node");

const cleverbot = new Cleverbot();
cleverbot.configure({ botapi: process.env.clever_api_key });
// End of Constants

// Start of "Cleverbot" Command
exports.run = (client, message, args) => {
  message.delete().catch(O_o => {});
  const botRoom = message.guild.channels.find("name", "bot-commands");
  if (message.channel.id !== "383850372768202753") {
    message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  } else {
    const cleverbotQuestion = args.slice(1).join(" ");
    cleverbot.write(cleverbotQuestion, response => {
      message.channel.send(`${message.author}, ${response.output}`);
    });
  }
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
