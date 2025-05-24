const { TicTacToe } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tictactoe')
    .setDescription('Play tictactoe!')
    .addUserOption(option => option.setName('opponent').setDescription('The opponent you want to play against').setRequired(true)),
    async execute (interaction) {

        const { options } = interaction;
        const opponent = options.getUser('opponent');

        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
              title: 'Tic Tac Toe',
              color: '#5865F2',
              statusTitle: 'Status',
              overTitle: 'Game Over'
            },
            emojis: {
              xButton: '❌',
              oButton: '🔵',
              blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} | Its turn of player **{player}**.',
            winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
          });
          
          Game.startGame();
    }
}