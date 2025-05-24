const { RockPaperScissors } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rockpaperscissors')
    .setDescription('Play rock paper scissors!')
    .addUserOption(option => option.setName('opponent').setDescription('The user you want to play against')),
    async execute (interaction) {

        const { options } = interaction;
        const opponent = options.getUser('opponent');

        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
              title: 'Rock Paper Scissors',
              color: '#5865F2',
              description: 'Press a button below to make a choice.'
            },
            buttons: {
              rock: 'Rock',
              paper: 'Paper',
              scissors: 'Scissors'
            },
            emojis: {
              rock: '🌑',
              paper: '📰',
              scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'You choose {emoji}.',
            winMessage: '**{player}** won the Game! Congratulations!',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
          });
          
          Game.startGame();
    }
}