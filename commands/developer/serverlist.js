const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js"),
ms = require("ms");
exports.run = async (client, message, args) => {
    if (!client.config.owners.includes(message.author.id)) return;


    let i0 = 0;
    let i1 = 10;
    let page = 1;


    let description = 
    `Total : ${message.client.guilds.cache.size}\n\n`+
    message.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`)
    .slice(0, 10)
    .join("\n");

    let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({ size : 2048 }))
        .setColor('RANDOM')
        .setFooter(message.client.user.username)
        .setTitle(`Page : ${page}/${Math.ceil(message.client.guilds.cache.size/10)}`)
        .setDescription(description)
        .setFooter(message.author.username)
        .setTimestamp();
    let msg = await message.channel.send(embed);
    
    await msg.react("⬅");
    await msg.react("➡");
    await msg.react("❌");

    let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async(reaction, user) => {

        if(reaction._emoji.name === "⬅") {

            i0 = i0-10;
            i1 = i1-10;
            page = page-1;
            if(i0 < 0){
                return msg.delete();
            }
            if(!i0 || !i1){
                return msg.delete();
            }
            
            description = `Servers : ${message.client.guilds.cache.size}\n\n`+
            message.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`)
            .slice(i0, i1)
            .join("\n");
            embed.setTitle(`Pages : ${page}/${Math.round(message.client.guilds.cache.size/10)}`)
            .setDescription(description);
            msg.edit(embed);
        
        };

        if(reaction._emoji.name === "➡"){

            i0 = i0+10;
            i1 = i1+10;
            page = page+1;

            if(i1 > message.client.guilds.size + 10){
                return msg.delete();
            }
            if(!i0 || !i1){
                return msg.delete();
            }
            description = `Total : ${message.client.guilds.cache.size}\n\n`+
            message.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`)
            .slice(i0, i1)
            .join("\n");
            embed.setTitle(`Page : ${page}/${Math.round(client.guilds.cache.size/10)}`)
            .setDescription(description);
            msg.edit(embed);

        };

        if(reaction._emoji.name === "❌"){
            return msg.delete(); 
        }
        await reaction.users.remove(message.author.id);

    });
}

  

exports.help = {
  name: "serverlist",
  description: `Serverlist to see all list that i join!`,
  name: "serverlist",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: [],
  cooldown: 1
}
