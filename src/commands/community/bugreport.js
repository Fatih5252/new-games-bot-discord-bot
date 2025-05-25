const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report a bug to the developers'),
    async execute (interaction) {

        if (!interaction.guild) return await interaction.reply({ content: `Please report a bug within the server`, flags: MessageFlags.Ephemeral })

        const modal = new ModalBuilder()
        .setTitle(`Bug & Command Abuse Reporting`)
        .setCustomId(`bugreport`)

        const command = new TextInputBuilder()
        .setCustomId('type')
        .setRequired(true)
        .setPlaceholder(`Please only state the problematic feature, (troll = blacklist)`)
        .setLabel(`What feature has a bug or is being abused?`)
        .setStyle(TextInputStyle.Short);

        const description = new TextInputBuilder()
        .setCustomId('description')
        .setRequired(true)
        .setPlaceholder(`Be Sure to be as detailed as possible so the developers can take action, (troll = blacklist)`)
        .setLabel(`Descripte the but or abuse`)
        .setStyle(TextInputStyle.Paragraph);

        const one = new ActionRowBuilder().addComponents(command);
        const two = new ActionRowBuilder().addComponents(description);

        modal.addComponents(one, two)
        await interaction.showModal(modal)
    }
}