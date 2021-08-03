module.exports = {
  name: 'ping',
  description: `Ping command used for testing.`,
  execute(message, args) {
    if(message.member.roles.cache.has('846923906299854848')){
      message.channel.send('pong!');
    } else {
      message.reply('you do not have sufficient permissions for this command');
      //message.member.roles.add('846923906299854848').catch(console.error);
    }
  }
}