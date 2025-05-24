const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bots')
    .setDescription('Gives some info about the bot :)')
    .addSubcommand(command => command.setName('uptime').setDescription('Displays the uptime of the bot :)'))
    .addSubcommand(command => command.setName('info').setDescription('Give some info on the bots stats :)')),
    async execute(interaction, client) {

        const sub = interaction.options.getSubcommand();
        const i = interaction;

        switch(sub) {
            case 'uptime':

        let totalSecs = (client.uptime / 1000);
        let days = Math.floor(totalSecs / 86400);totalSecs %= 86400;
        let hrs = Math.floor(totalSecs / 3600);totalSecs %= 3600;
        let mins = Math.floor(totalSecs / 60);
        let seconds = Math.floor(totalSecs % 60);
        let uptime = `**${days}**d **${hrs}**h **${mins}**m **${seconds}**s`;

        const uptimeEmbed = new EmbedBuilder()
        .setColor("White")
        .setTitle(`> 🌎 Bots current uptime`)
        .setAuthor({ name: `🤖 Bot Uptime Tool`})
        .setFooter({ text: `🤖 Bot Uptime Tool.`})
        .setThumbnail('https://cdn.discordapp.com/attachments/1129094438669520956/1210255286854619136/Untitled_design_30.png?ex=65e9e511&is=65d77011&hm=4b112f92d07c7fb26e1e7c3c43b4ccc4d6ff60ccd1f2a1660e8f6c1e6a50d20a&')
        .setTimestamp()
        .addFields({ name: `**⌛ UPTIME**`, value: uptime })

        await i.reply({ embeds: [uptimeEmbed] });

        break;
        case 'info':
        
        const infoEmbed = new EmbedBuilder()
        .setColor("White")
        .setTitle('> 🌎 Bots Information')
        .setAuthor({ name: `🤖 Bot Info Tool`})
        .setFooter({ text: `🤖 Bot Info Tool.`})
        .setThumbnail('https://cdn.discordapp.com/attachments/1129094438669520956/1210259153227092049/Untitled_design_31.png?ex=65e9e8ab&is=65d773ab&hm=be8683107742aae8aa5bc114d054f5045e7338030cdfa3e7fdbd68a5a2e40e6d&')
        .setTimestamp()
        .addFields({ name: `**🛠️ STATS**`, value: `Bots current stats`, inline: false})
        .addFields({ name: `Server Count: `, value: `> **${client.guilds.cache.size}**`, inline: true})
        .addFields({ name: `Member Count: `, value: `> **${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)}**`, inline: true})
        .addFields({ name: `Commands: `, value: `> **${client.commands.size}**`, inline: true})
        .addFields({ name: `Latency: `, value: `> **${Math.round(client.ws.ping)}ms**`, inline: true})

        await i.reply({ embeds: [infoEmbed]});
        }
    }
}