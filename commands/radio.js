// Start of "Radio" Command
exports.run = (client, message, args) => {
  const botRoom = message.guild.channels.find("name", "bot-commands");
  const toJoin = client.channels.get("379696208622518272");
  if (message.channel.id !== "383850372768202753") {
    message.channel.id(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
    return 0;
  }
  if (args.length < 1 || args.length > 2) {
    message.author.send([
      "ERROR: Not enough arguments",
      "Usage: `!radio <play> <(optional) truckersfm | eurotruck | capitalfm`",
    ]);
    return 0;
  }
  if (args[0] === "stop") {
    toJoin.leave();
    message.guild.channels
      .find("name", "moderation-log")
      .send("Radio has been stopped");
    return 1;
  }
  if (!message.member.voiceChannel) {
    message.channel.send(
      "You are required to be in a voice channel to use this command",
    );
    return 0;
  }
  if (args[0] === "play") {
    toJoin
      .join()
      .then(connection => {
        client.channels.get("383850372768202753");

        if (connection.playing) {
          connection.stopPlaying();
        }

        switch (args[1]) {
          case "truckersfm":
            message.guild.channels
              .find("name", "bot-commands")
              .send("Now Playing: TruckersFM");
            connection.playArbitraryInput("https://radio.truckers.fm/");
            break;
          case "eurotruck":
            message.guild.channels
              .find("name", "bot-commands")
              .send("Now Playing: Euro Truck Radio");
            connection.playArbitraryInput(
              "http://radio.eurotruckradio.co.uk:8000/stream",
            );
            break;
          case "capitalfm":
            message.guild.channels
              .find("name", "bot-commands")
              .send("Now Playing: CapitalFM");
            connection.playArbitraryInput(
              "http://media-ice.musicradio.com/CapitalMP3",
            );
            break;
          default:
            {
              const radioArray = [
                {
                  url: "http://radio.eurotruckradio.co.uk:8000/stream",
                  name: "Euro Truck Radio",
                },
                {
                  url: "https://radio.truckers.fm/",
                  name: "Truckers FM",
                },
                {
                  url: "http://media-ice.musicradio.com/CapitalMP3",
                  name: "Capital FM",
                },
              ];
              const randomStream = Math.floor(
                Math.random() * radioArray.length,
              );
              connection.playArbitraryInput(radioArray[randomStream]["url"]);
              message.guild.channels
                .find("name", "bot-commands")
                .send(`Now playing: ${radioArray[randomStream]["name"]}`);
            }
            break;
        }
        return 1;
      })
      .catch(err => {
        console.log(err);
        return 0;
      });
  }
};
// End of "Radio" Command

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
  name: "radio",
  description:
    "Play a variety of radio stations from Capital FM, TruckersFM and EuroTruckRadio!",
  usage: "radio play <capitalfm, truckersfm, eurotruck>",
};
// End of Misc.
