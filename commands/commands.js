module.exports = {
  name: 'commands',
  description: "test",
  execute(message, args, Discord) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor('#0abde3')
      .setTitle('Commands')
      .setDescription('List of all available commands.')
      .addFields(
        {name: 'cmd', value: '1'},
        {name: 'cmd', value: '2'},
        {name: 'cmd', value: '3'},
      )
      //.setImage()
      .setFooter('');
    message.channel.send(newEmbed);
  }
}