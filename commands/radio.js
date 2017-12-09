// Start of Constants
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Radio" Command
exports.run = (client, message, args) => {
  const toJoin = client.channels.get(settings.radioChannel);
  const botRoom = message.guild.channels.find("id", settings.commandsChannel);

  if (message.channel.id !== settings.commandsChannel) {
    return message.channel.id(
      `Whoops, it looks like you're not in the ${botRoom} channel`,
    );
  }

  if (args.length < 1 || args.length > 2) {
    return message.author.send([
      "ERROR: Not enough arguments",
      "Usage: `!radio <play> <(optional) truckersfm | eurotruck | capitalfm`",
    ]);
  }

  if (args[0] === "stop") {
    toJoin.leave();
    return botRoom.send("Radio has been stopped");
  }

  if (!message.member.voiceChannel) {
    return message.channel.send(
      "You are required to be in a voice channel to use this command",
    );
  }

  if (message.member.voiceChannel.id !== settings.radioChannel) {
    return message.channel.send(
      "You are required to be in the Radio channel to use this command",
    );
  }

  if (args[0] === "play") {
    toJoin
      .join()
      .then(connection => {
        if (connection.playing) {
          connection.stopPlaying();
        }

        switch (args[1]) {
          case "truckersfm":
            botRoom.send("Now Playing: TruckersFM");
            connection.playArbitraryInput("https://radio.truckers.fm/");
            break;
          case "eurotruck":
            botRoom.send("Now Playing: Euro Truck Radio");
            connection.playArbitraryInput(
              "http://radio.eurotruckradio.co.uk:8000/stream",
            );
            break;
          case "capitalfm":
            botRoom.send("Now Playing: CapitalFM");
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
              botRoom.send(`Now playing: ${radioArray[randomStream]["name"]}`);
            }
            break;
        }
      })
      .catch(err => console.log(err));
  }
};
// End of "Radio" Command

// Start of Permission Level Setting, etc.
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
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
