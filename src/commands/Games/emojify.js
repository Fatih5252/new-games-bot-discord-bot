const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojify')
        .setDescription('Change text to emojis')
        .addStringOption(option => option.setName('text').setDescription('The text to convert').setRequired(true))
        .addStringOption(option => option.setName('hidden').setDescription('Hide this message?').addChoices({ name: 'Hidden', value: 'true' }, { name: 'Not Hidden', value: 'false' }).setRequired(true)),
    async execute(interaction) {

        const { options } = interaction;
        const text = options.getString('text');
        var hidden = options.getString('hidden') || false;

        if (hidden === 'true') hidden = true;
        else if (hidden === 'false') hidden = false;

        var emojiText = text
            .toLowerCase()
            .split('')
            .map((char) => {
                if (char >= 'a' && char <= 'z') {
                    return `:regional_indicator_${char}:`;
                } else if (char === ' ') {
                    return ' ';
                } else {
                    return char; // Keep non letter characters as they are so yeye
                }
            })
            .join('');

        if (emojiText.length >= 2000) emojiText = `I can't emojify this text, it's too long!`;

        await interaction.reply({ content: emojiText, ephemeral: hidden });
        console.log(emojiText);
    }
};
