module.exports = {
  name: 'clear',
  description: "Clears up to the last 100 messages from the channel.",
  async execute(message, args) {
    if(message.member.permissions.has('MANAGE_MESSAGES')) {
      if(!args[0]) {
        return message.reply("please enter number of messages you want to clear");
      }
      if(isNaN(args[0])) {
        return message.reply("please enter a valid number!");
      }
      if(args[0] > 100) {
        return message.reply("you can only clear up to 100 messages.");
      }
      if(args[0] < 1) {
        return message.reply("please clear at least 1 message.");
      }

      await message.channel.messages.fetch({limit: args[0]}).then(messages => {
        message.channel.bulkDelete(messages);
      });
    } else {
      message.channel.reply('you do not have sufficient permissions for this command');
    }
  }
}