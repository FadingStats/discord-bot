// Start of Constants
// const Discord = require("discord.js");
const config = require("../storage/settings.json");
const fs = require("fs");
// End of Constants

// Start of Ready Event
module.exports = async client => {
  console.log(`\nBreaker breaker 1-9: ${config.botName} is now online, 10-65`);

  client.mutes = require("../storage/mutes.json");

  client.setInterval((i, message) => {
    if (i in client.mutes) {
      const { time } = client.mutes[i].time;
      const guildId = client.mutes[i].guild;
      const guild = client.guilds.get(guildId);
      const member = guild.members.get(i);
      const mutedRole = guild.roles.find(
        r => r.name === config.silencedRoleName,
      );
      const defaultRole = message.guild.roles.find(
        r => r.name === config.memberRoleName,
      );
      if (!mutedRole);

      if (Date.now() > time) {
        console.log(`${i} is now able to be unsilenced`);

        member.removeRole(mutedRole);
        member.addRole(defaultRole);
        delete client.mutes[i];

        fs.writeFile(
          "./storage/mutes.json",
          JSON.stringify(client.mutes),
          err => {
            if (err) throw err;
            console.log(`I have unsilenced ${member.user.username}.`);
          },
        );
      }
    }
  }, 5000);

  try {
    const link = await client.generateInvite(["ADMINISTRATOR"]);
    console.log(`\nInvite link: ${link}`);
  } catch (e) {
    console.log(e.stack);
  }

  client.user
    .setStatus("online")
    .then(
      console.log(
        `\n${client.user.username} is online with ${
          client.users.size
        } users, in ${client.channels.size} channels of ${
          client.guilds.size
        } guilds`,
      ),
    )
    .catch(console.error);

  client.generateInvite(["ADMINISTRATOR"]);
};
// End of Ready Event
