require("dotenv").config();

const { Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
});
const Database = require("@replit/database");
const Discord = require("discord.js");
// const config= require('./config.js');
const prefix = "!";
const fs = require("fs");
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", async () => {
  console.log(`${client.user.username} successfully logged in.`);
  client.user.setActivity("in the garden.");
});

client.on("guildMemberAdd", (guildMember) => {
  // let welcomeRole = guildMember.guild.roles.cache.find(role => role.id === '846898905521717249');
  // guildMember.roles.add(welcomeRole);
  // guildMember.guild.channels.cache.get('846890475365728296').send(`Welcome <@${guildMember.user.id}> to Titania's Garden! Please head to <#846884795597717514> for server rules and role assignment.`);
});

const getRoleId = (reaction) => {
  if (reaction.message.id === "847755309803634709") {
    if (reaction.emoji.name === "🌱") {
      return "846900178438193182";
    }
    if (reaction.emoji.name === "🫒") {
      return "846903545144016946";
    }
  } else if (reaction.message.id === "847764027975008256") {
    if (reaction.emoji.name === "🐴") {
      return "847764773310955551";
    }
    if (reaction.emoji.name === "🐦") {
      return "847764887475847179";
    }
    if (reaction.emoji.name === "🐶") {
      return "847764974004600852";
    }
    if (reaction.emoji.name === "🐲") {
      return "847765042971148288";
    }
    if (reaction.emoji.name === "🐯") {
      return "930984328048021504";
    }
    if (reaction.emoji.name === "🗓️") {
      return "847767135853084692";
    }
    if (reaction.emoji.name === "🗺️") {
      return "847767252689616929";
    }
    if (reaction.emoji.name === "⌛") {
      return "847767299615490078";
    }
    if (reaction.emoji.name === "⚔️") {
      return "847767413822717962";
    }
    if (reaction.emoji.name === "🌋") {
      return "847767454683758603";
    }
    if (reaction.emoji.name === "🎖️") {
      return "847767562535174145";
    }
    if (reaction.emoji.name === "💀") {
      return "847767595859443763";
    }
    if (reaction.emoji.name === "☠️") {
      return "847767676176039947";
    }
    if (reaction.emoji.name === "🪦") {
      return "847767727166324747";
    }
    if (reaction.emoji.name === "🎉") {
      return "863978831140356136";
    }
  } else if (reaction.message.id === "875095805785178162") {
    if (reaction.emoji.name === "🎉") {
      return "863978831140356136";
    }
    if (reaction.emoji.name === "🏡") {
      return "875096402898878504";
    }
    if (reaction.emoji.name === "📺") {
      return "875096482083115038";
    }
    if (reaction.emoji.name === "🔞") {
      return "871607200257298462";
    }
  }
};

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (
    reaction.message.channel.id === "847944722387435540" &&
    reaction.message.id !== "847956278734225449"
  ) {
    if (
      reaction.emoji.name === "✅" &&
      reaction.message.author.id === user.id
    ) {
      reaction.message.delete();
    }
  }

  var roleId = getRoleId(reaction);
  if (roleId) {
    const guestRole = reaction.message.guild.roles.cache.find(
      (role) => role.id === "846898905521717249"
    );
    var newRole = reaction.message.guild.roles.cache.find(
      (role) => role.id === roleId
    );
    // if (roleId === '846900178438193182' || roleId === '846903545144016946') {
    //   await reaction.message.guild.members.cache.get(user.id).roles.remove(guestRole);
    // }
    await reaction.message.guild.members.cache.get(user.id).roles.add(newRole);
  } else {
    return;
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  var roleId = getRoleId(reaction);
  if (roleId) {
    const guestRole = reaction.message.guild.roles.cache.find(
      (role) => role.id === "846898905521717249"
    );
    var newRole = reaction.message.guild.roles.cache.find(
      (role) => role.id === roleId
    );
    await reaction.message.guild.members.cache
      .get(user.id)
      .roles.remove(newRole);
    const memberTarget = await reaction.message.guild.members.cache.get(
      user.id
    );
    await memberTarget.roles.remove(newRole);
    // const roles = await reaction.message.guild.members.cache.get(user.id).roles.cache;
    const roles = memberTarget.roles.cache;
    if (
      !roles.has("846900178438193182") &&
      !roles.has("846903545144016946") &&
      !roles.has("858016385975451648") &&
      !roles.has("847566905984548961") &&
      !roles.has("858021030764871700") &&
      !roles.has("870822561347416104") &&
      !roles.has("847382349628309514")
    ) {
      for (var i = 0; i < memberTarget._roles.length; i++) {
        memberTarget.roles.remove(memberTarget._roles[i]);
      }
      // memberTarget.roles.add(guestRole);
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.channel.id === "847944722387435540") {
    const content = message.content.split(/\s+/);
    const firstWord = content.shift().toLowerCase();
    if (
      (firstWord === "gather:" || firstWord === "craft:") &&
      content.length > 0
    ) {
      message.react("🚧");
      message.react("✅");
    } else {
      message.delete();
    }
  } else if (
    message.channel.id === "848708945970593842" &&
    !message.author.bot
  ) {
    client.commands.get("reassure").execute(message);
  } else if (
    message.channel.id === "871833016580833280" &&
    !message.author.bot
  ) {
    const content = message.content.split(":");
    if (content.length < 2) {
      message.delete();
    } else {
      const thread = await message.channel.threads.create({
        name: content[0],
        autoArchiveDuration: 4320,
        reason: content[1],
      });
      await thread.members.add(message.author.id);
      thread.send(
        `[Details] ${message.content}\n<@&846923906299854848> <@&847382349628309514>`
      );
      await message.channel.messages.fetch({ limit: 2 }).then((messages) => {
        message.channel.bulkDelete(messages);
      });
    }
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  } else if (command === "commands") {
    //client.commands.get('commands').execute(message, args, Discord);
  } else if (command === "clear") {
    client.commands.get("clear").execute(message, args);
  } else if (command === "kick") {
    client.commands.get("kick").execute(message, args);
  } else if (command === "ban") {
    client.commands.get("ban").execute(message, args);
  } else if (command === "basicroles") {
    //client.commands.get('basicroles').execute(message, args, Discord, client);
    // } else if (command === 'mute') {
    //   client.commands.get('mute').execute(message, args);
  } else if (command === "unmute") {
    client.commands.get("unmute").execute(message, args);
  }
});

client.login(process.env.DISCORD_TOKEN);
