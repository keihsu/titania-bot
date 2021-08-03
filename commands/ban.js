module.exports = {
  name: 'ban',
  description: 'Bans a member from the server.',
  execute(message, args) {
    if(message.member.permissions.has('BAN_MEMBERS')) {
      const member = message.mentions.users.first();
      if(member) {
        const memberTarget = message.guild.members.cache.get(member.id);
        memberTarget.ban();
        message.channel.send(`${memberTarget.displayName} has been banned from the server.`);
      } else {
        message.reply('please tag and specify a member to ban.');
      }
    } else {
      message.reply('you do not have sufficient permissions for this command');
    }
  }
}