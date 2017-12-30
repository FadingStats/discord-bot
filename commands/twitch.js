// Start of Constants
const bugsnag = require("bugsnag");
const request = require("superagent");
const Discord = require("discord.js");
const settings = require("../storage/settings.json");
// End of Constants

// Start of Functions
function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// End of Functions

// Start of "Twitch" Command
exports.run = (client, message) => {

  if (message.channel.id !== settings.commandsChannel) {
    const botRoom = message.guild.channels.find("id", settings.commandsChannel);
    message.channel.send(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  } else {
    message.delete().catch(console.error);
    const argsOne = message.content.split(" ").slice(1);
    const result = argsOne.join(" ");

    if (!result) {
      message.channel.send("No channel specified!");
      return;
    }

    const url = `https://api.twitch.tv/kraken/streams/${result}`;
    request
      .get(url)
      .set({
        Accept: "application/vnd.twitchtv.v3+json",
        "Client-ID": process.env.twitchId,
      })
      .end((error, response) => {
        if (error) {
          bugsnag.notify(error);
        }
        if (!error && response.statusCode === 200) {
          let resp;
          try {
            resp = response.body;
          } catch (e) {
            message.channel.send(
              "The API returned an unconventional response.",
            );
          }
          if (resp.stream !== null) {
            const embed = new Discord.RichEmbed()
              .setAuthor(
                `${jsUcfirst(result)} is currently live `,
                `${resp.stream.channel.logo}`,
              )
              .addField("Stream Title", `${resp.stream.channel.status}`, true)
              .addField("Stream URL", `https://twitch.tv/${result}`, true)
              .addField("Followers", `${resp.stream.channel.followers}`, true)
              .addField("Views", `${resp.stream.channel.views}`, true)
              .setImage(resp.stream.preview.large);
            message.channel.send({ embed });
          } else if (resp.stream === null) {
            message.channel.send(`${result} is currently not streaming`);
          }
        } else if (!error && response.statusCode === 404) {
          message.channel.send("Channel does not exist!");
        }
      });
  }
};
// End of "Twitch" Command

// Start of Permission System, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["t"],
  permLevel: 0,
};
// End of Permission System, etc.

// Start of Misc.
exports.help = {
  name: "twitch",
  description:
    "Twitch Command. Shows if an user is currently live on Twitch or not.",
  usage: "twitch <twitch username>",
};
// End of Misc.
