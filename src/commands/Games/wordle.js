const { Wordle } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('wordle')
    .setDescription('Play wordle!'),
    async execute (interaction) {

        const Game = new Wordle({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Welcome to Wordle! type a 5 letter word in the chat!',
              description: 'woefjrehu',
              color: '#5865F2',
            },
            customWord: null,
            timeoutTime: 60000,
            winMessage: 'You won! The word was **{word}**.',
            loseMessage: 'You lost! The word was **{word}**.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }
}