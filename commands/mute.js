const Database = require("@replit/database")
const db = new Database()
module.exports = {
  name: 'mute',
  description: 'Mutes a member on the server.',
  async execute(message, args) {
    if(message.member.permissions.has('KICK_MEMBERS')) {
      const member = message.mentions.users.first();
      if(member) {
        const memberTarget = message.guild.members.cache.get(member.id);
        const muteRole = '848710358632759316';
        //console.log(memberTarget._roles);
        if(memberTarget._roles.includes(muteRole)) {
          return message.reply(`${memberTarget.displayName} is already in the Dreamkeep.`)
        }

        const everyoneRole = '846877885129162752';

        if(muteRole in memberTarget._roles) {
          return message.reply(`${memberTarget.displayName} is already in the Dreamkeep.`)
        }

        await db.set(member.id, memberTarget._roles);
        //console.log(await db.get(member.id));
        for (var i = 0; i < memberTarget._roles.length; i++) {
          memberTarget.roles.remove(memberTarget._roles[i]);
        }
        memberTarget.roles.add(muteRole);
        message.channel.send(`${memberTarget.displayName} has been sent to the Dreamkeep.`);
        setTimeout(() => {
          message.guild.channels.cache.get('848708945970593842').send(`**Welcome to the Dreamkeep, <@${member.id}>.**\nI hope you can use your time here to recover from the corruption that has started to spread within you.\nI shall be here if you need to talk.`);
        }, 3000);
      } else {
        message.reply('please tag and specify a member to mute.');
      }
    } else {
      message.reply('you do not have sufficient permissions for this command');
    }
  }
}