const { EmbedBuilder, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute (interaction, client) {
        
        if (!interaction.guild || !interaction.isModalSubmit()) return;

        if (interaction.customId === 'bugreport') {
            const command = interaction.fields.getTextInputValue('type');
            const description = interaction.fields.getTextInputValue('description');

            const id = interaction.user.id;
            const member = interaction.member;
            const server = interaction.guild;

            const channel = await client.channels.cache.get('discord category id');

            const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle(`New Bug report!`)
            .addFields({ name: "Reporting Member", value: `\`${member.user.username} (${id})\``})
            .addFields({ name: "Reporting Guild", value: `\`${server.name} (${server.id})\``})
            .addFields({ name: "Problematic Feature", value: `> ${command}`})
            .addFields({ name: "Report Description", value: `> ${description}`})
            .setTimestamp()
            .setFooter({ text: `Bug report system` })

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId(`bugSolved - ${id}`)
                .setStyle(ButtonStyle.Danger)
                .setLabel(`Mark as solved`)
            );

            await channel.send({ embeds: [embed], components: [button] }).catch(err => {})
            await interaction.reply({ content: `Your report has been recorded. Our developers will look into this issue, and reach out with any further questions.`, flags: MessageFlags.Ephemeral });
        }
    }
}