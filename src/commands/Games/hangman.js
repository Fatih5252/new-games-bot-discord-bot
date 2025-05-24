const { Hangman } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play hangman!'),
    async execute (interaction) {

        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Hangman',
              color: '#5865F2'
            },
            hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
            customWord: undefined,
            timeoutTime: 60000,
            theme: 'nature',
            winMessage: 'You won! The word was **{word}**.',
            loseMessage: 'You lost! The word was **{word}**.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }
}