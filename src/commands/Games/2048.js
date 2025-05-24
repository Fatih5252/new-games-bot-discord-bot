const { TwoZeroFourEight } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('2048')
    .setDescription('Play 2048!'),
    async execute (interaction) {

        const Game = new TwoZeroFourEight({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '2048',
              color: '#5865F2'
            },
            emojis: {
              up: '⬆️',
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }
}