module.exports = {
  name: 'kick',
  description: 'Kicks a member from the server.',
  execute(message, args) {
    if(message.member.permissions.has('KICK_MEMBERS')) {
      const member = message.mentions.users.first();
      if(member) {
        const memberTarget = message.guild.members.cache.get(member.id);
        memberTarget.kick();
        message.channel.send(`${memberTarget.displayName} has been kicked from the server.`);
      } else {
        message.reply('please tag and specify a member to kick.');
      }
    } else {
      message.reply('you do not have sufficient permissions for this command');
    }
  }
}