const Database = require("@replit/database")
const db = new Database()
module.exports = {
  name: 'unmute',
  description: 'Unmutes a member on the server.',
  async execute(message, args) {
    if(message.member.permissions.has('KICK_MEMBERS')) {
      const member = message.mentions.users.first();
      if(member) {
        const memberTarget = message.guild.members.cache.get(member.id);
        const muteRole = '848710358632759316';

        if(!memberTarget._roles.includes(muteRole)) {
          return message.reply(`${memberTarget.displayName} was not found in the Dreamkeep.`)
        }

        const rolesToLoad = await db.get(member.id);

        //await db.set(member.id, rolesToSave);
        //console.log(await db.get(member.id));
        for (var i = 0; i < rolesToLoad.length; i++) {
          memberTarget.roles.add(rolesToLoad[i]);
        }
        memberTarget.roles.remove(muteRole);
        db.delete(member.id);
        message.channel.send(`${memberTarget.displayName} has left the Dreamkeep.`);
      } else {
        message.reply('please tag and specify a member to unmute.');
      }
    } else {
      message.reply('you do not have sufficient permissions for this command');
    }
  }
}