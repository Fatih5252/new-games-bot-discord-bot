const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Play 8ball!')
    .addStringOption(option => option.setName('question').setDescription('This will be your question for the 8ball!').setRequired(true)),
    async execute (interaction) {

        const { options } = interaction;
        const question = options.getString('question')
        const choice = ["🧿| It is certain.", "🧿| It is decidedly so.", "🧿| Without a doubt.", "🧿| Yes definitly.", "🧿| As i see it, yes.", "🧿| NO.", "🧿| Dont do that.", "🧿| Cannot predict now."];
        const ball = Math.floor(Math.random() * choice.length);

        const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle(`🧿| ${interaction.user.username}'s 8ball game!`)
        .addFields({ name: "Question", value: `${question}`, inline: true })

        const embed2 = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle(`🧿| ${interaction.user.username}'s 8ball game!`)
        .addFields({ name: "Question", value: `${question}`, inline: true })
        .addFields({ name: "Answer", value: `${choice[ball]}`, inline: true })

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setLabel(`🧿 Rolle the Ball!`)
            .setStyle(ButtonStyle.Primary)
        )

        const msg = await interaction.reply({ embeds: [embed], components: [button] });

        const collector = msg.createMessageComponentCollector()

        collector.on('collect', async i => {
            if (i.customId === 'button') {
                i.update({ embeds: [embed2], components: [] })
            }
        })
    }
}