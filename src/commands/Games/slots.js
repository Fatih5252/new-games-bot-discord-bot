const { Slots } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('slots')
    .setDescription('Play slots!'),
    async execute (interaction) {

        const Game = new Slots({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Slot Machine',
              color: '#5865F2'
            },
            slots: ['🍇', '🍊', '🍋', '🍌']
          });
          
          Game.startGame();
    }
}