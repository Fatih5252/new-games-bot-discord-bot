const { SlashCommandBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('click-game')
        .setDescription('A silly click game'),
    async execute(interaction) {
        let number = 0;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("click_button")
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary)
            );

        await interaction.reply({
            content: `You clicked ${number} times`,
            components: [row],
            withResponse: true,
        });

        const collector = interaction.channel.createMessageComponentCollector({
            time: 30000,
        });

        collector.on("collect", async (i) => {
            if (i.customId === "click_button" && i.user.id === interaction.user.id) {
                number++;
                await i.update({
                    content: `You clicked ${number} times`,
                    components: [row],
                });
            } else {
                await i.reply({
                    content: `Only <@${interaction.user.id}> can use this button!`,
                    flags: MessageFlags.Ephemeral,
                });
            }
        });
    }
};
