const { WouldYouRather } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('would-you-rather')
    .setDescription('Play would you rather!'),
    async execute (interaction) {

        const Game = new WouldYouRather({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Would You Rather',
              color: '#5865F2',
            },
            buttons: {
              option1: 'Option 1',
              option2: 'Option 2',
            },
            timeoutTime: 60000,
            errMessage: 'Unable to fetch question data! Please try again.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }
}