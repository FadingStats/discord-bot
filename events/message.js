// Start of Constants
const settings = require("../storage/settings.json");
// End of Constants

// Start of Message Event
module.exports = async (message) => {
  const { client } = message;

  if (message.author.bot) return;
  if (message.content.startsWith(settings.prefix)){
    const command = message.content.split(" ")[0].slice(settings.prefix.length);
    const params = message.content.split(" ").slice(1);
    const perms = client.elevation(message);
    let cmd;

    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) {
        return message.author.send(["ERROR: Permission denied"]);
      }

      cmd.run(client, message, params, perms);
    }
  }
 
  
  if (message.channel.id === '378573675500273664') {

    const hgvmpChat = message.guild.channels.find("id", '380556463959048192');

    const templateSuggestion = message.content.split(' ')[0];
    const suggestionBody = message.content.split(' ').slice(1).join(' ');

    if (templateSuggestion === 'Suggestion:' && suggestionBody) {
      await message.react('387688773326209026')
      await message.react('387688754258771968')
    } else {
      message.delete();
      message.channel.send(`${message.author}, this channel is for suggestions \*\*only\*\*, if you wish to discuss a suggestion that has been made please use the ${hgvmpChat} channel. Otherwise, ensure your post follows the suggestion guideline when putting forward an idea:\n\n\`\`\`Suggestion:\nDescription:\nWhat benefits does it have?\nScreenshots / Images of Suggestion:\`\`\`\n\n\*This post will be removed in 15 seconds\*`).then(message => message.delete(15000));
    }
  }
};
// End of Message Event
