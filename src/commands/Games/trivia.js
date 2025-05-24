const { Trivia } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Play trivia!'),
    async execute (interaction) {

        const Game = new Trivia({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Trivia',
              color: '#5865F2',
              description: 'You have 60 seconds to guess the answer.'
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            trueButtonStyle: 'SUCCESS',
            falseButtonStyle: 'DANGER',
            mode: 'multiple',  // multiple || single
            difficulty: 'easy',  // easy || medium || hard
            winMessage: 'You won! The correct answer is {answer}.',
            loseMessage: 'You lost! The correct answer is {answer}.',
            errMessage: 'Unable to fetch question data! Please try again.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }
}