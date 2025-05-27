const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a number between 1 and 6'),
    async execute(interaction) {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        await interaction.reply(`🎲 You rolled a **${diceRoll}**!`);
    }
};
