// Start of Constants
const settings = require("../storage/settings.json");
// End of Constants

// Start of "Reason" Command
exports.run = async (client, message, args) => {
  const modLog = client.channels.find("id", settings.moderationLogsChannel);
  const caseNumber = args.shift();
  const newReason = args.join(" ");

  async function embedSan(embed) {
    message.delete().catch();

    if (embed.message) delete embed.message;
    if (embed.footer) delete embed.footer.embed;
    if (embed.provider) delete embed.provider.embed;
    if (embed.thumbnail) delete embed.thumbnail.embed;
    if (embed.image) delete embed.image.embed;
    if (embed.author) delete embed.author.embed;
    if (embed.fields) {
      embed.fields.forEach(f => {
        delete f.embed;
      });
    }

    return embed;
  }

  await modLog.fetchMessages({ limit: 100 }).then(messages => {
    const caseLog = messages
      .filter(
        m =>
          m.author.id === client.user.id &&
          m.embeds[0] &&
          m.embeds[0].type === "rich" &&
          m.embeds[0].footer &&
          m.embeds[0].footer.text.startsWith("Case") &&
          m.embeds[0].footer.text === `Case ${caseNumber}`,
      )
      .first();
    modLog.fetchMessage(caseLog.id).then(logMsg => {
      const embed = logMsg.embeds[0];
      embedSan(embed);
      embed.description = embed.description.replace(
        `Awaiting moderator's input. Use ${settings.prefix}reason ${
          caseNumber
        } <reason>.`,
        newReason,
      );
      logMsg.edit({ embed });
    });
  });
};
// End of "Reason" Command

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
  name: "reason",
  description: "Updates an unset moderator action.",
  usage: "reason <case number> <new reason>",
};
// End of Misc.
