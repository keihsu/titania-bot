module.exports = {
  name: 'basicroles',
  description: 'Sets up a reaction role message.',
  async execute(message, args, Discord, client) {
    const channel = '847301308435398715';
    const saplingRole = message.guild.roles.cache.find(role => role.id === '846900178438193182');
    const friendRole = message.guild.roles.cache.find(role => role.id === '846903545144016946');

    const saplingEmoji = ':seedling: ';
    const friendEmoji = ':olive: ';

    let embed = new Discord.MessageEmbed()
      .setColor('#0abde3')
      .setTitle("Are you a member or friend?")
      .setDescription(
        `${saplingEmoji}   Member\n\n` +
        `${friendEmoji}   Friend`);

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(saplingEmoji);
    messageEmbed.react(friendEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === saplingEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(saplingRole);
        }
        if (reaction.emoji.name === friendEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(friendRole);
        } 
      } else {
        return;
      }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === saplingEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.remove(saplingRole);
        }
        if (reaction.emoji.name === friendEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.remove(friendRole);
        } 
      } else {
        return;
      }
    });
  }
}