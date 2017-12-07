// Start of Constants
const settings = require("../storage/settings.json");
const Discord = require("discord.js");
// End of Constants

// Start of Fortunes
const fortunes = [
  "It is certain.",
  "It is decidely so.",
  "Without a doubt.",
  "Yes definetely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Can't predict now.",
  "Concentrate and ask again.",
  "Do not count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful",
];
// End of Fortunes

// Start of "8Ball" Command
exports.run = (client, message) => {
  message.delete().catch(O_o => {});
  const botRoom = message.guild.channels.find("name", "bot-commands");
  if (message.channel.id !== "383850372768202753") {
    message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  } else {
    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g);
    const result = Math.floor(Math.random() * fortunes.length + 0);
    const userQuestion = args.slice(1, args.length).join(" ");
    if (args[1]) {
      if (!message.author.avatarURL) {
        const embedNoAvatar = new Discord.RichEmbed()
          .setAuthor(`${message.author.username}`, `${message.guild.iconURL}`)
          .addField("Question:", `${userQuestion}`)
          .addField("Answer:", fortunes[result]);
        message.channel.send({ embed: embedNoAvatar });
      } else {
        const embed = new Discord.RichEmbed()
          .setAuthor(
            `${message.author.username}`,
            `${message.author.avatarURL}`,
          )
          .addField("Question:", `${userQuestion}`)
          .addField("Answer:", fortunes[result]);
        message.channel.send({ embed });
      }
    } else console.log("Someone forgot to give a question!"); // message.channel.send(`You forgot to ask me a question, idiot!`);
  }
};
// End of "8Ball" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};
// End of Permission Level Setting, etc.

// Start of Misc.
exports.help = {
  name: "8ball",
  description: "Get a fortune read towards your question!",
  usage: "8ball <question>",
};
// End of Misc.
