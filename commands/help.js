// Start of Constants
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Help" Command
exports.run = (client, message, params) => {
  message.delete().catch();
  if (message.channel.id !== "383850372768202753") {
    const botRoom = message.guild.channels.find("name", "bot-commands");
    message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  } else if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce(
      (long, str) => Math.max(long, str.length),
      0,
    );
    message.channel.send(
      `= Command List =\n\n[Use ${
        settings.prefix
      }help <commandname> for details]\n\n${client.commands
        .map(
          c =>
            `${settings.prefix}${c.help.name}${" ".repeat(
              longest - c.help.name.length,
            )} :: ${c.help.description}`,
        )
        .join("\n")}`,
      { code: "asciidoc" },
    );
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(
        `= ${command.help.name} = \n${command.help.description}\nUsage: ${
          settings.prefix
        }${command.help.usage}`,
        { code: "asciidoc" },
      );
    }
  }
};
// End of "Help" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: 0,
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "help",
  description:
    "Display's all the available commands for your permission level.",
  usage: "help [command]",
};
// End of Misc.
