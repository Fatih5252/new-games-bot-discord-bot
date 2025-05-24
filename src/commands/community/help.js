const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const pagination = require('../../functions/pagination');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('commands')
    .setDescription('All the commands that the bot has'),
    async execute (interaction) {

        const embeds = [];

        var page0 = `
        ## pages
        page 1 = Thanks invite
        page 2 = Game Commands
        Page 3 = Help commands
        page 4 = links`

        var page1 = `
        ## about the bot
        first of all thanks for inviting the games bot!
        you can find all of the commands in the second page!`

        var page2 = `
        ## Game Commands
        here are all the game commands!
        **/findemoji**
        Play findemoji!
        **/flood**
        Play flood!
        **/guessthepokemon**
        Play guessthepokemon!
        **/hangman**
        Play hangman!
        **/matchpairs**
        Play matchpairs!
        **/minesweeper**
        Play minesweeper!
        **/rockpaperscissors**
        Play rockpaperscissors!
        **/slots**
        Play slots!
        **/snake**
        Play snake!
        **/tictactoe**
        Play tictactoe!
        **/trivia**
        Play trivia!
        **/wordle**
        Play wordle!
        **/would-you-rather**
        Play wouldyourather!`

        var page3 = `
        ## Help Commands
        **/Help (this command)**
        see all the commands that the bot has`

        var page4 = `
        ## Links
        Here are all the links (like privcy policy)
        **Pivacy-Policy:**
        https://fatih-simsek.de/games-bot/privacy-policy
        **Terms-of-Service:**
        https://fatih-simsek.de/games-bot/terms-of-service`

        for (var i = 0; i < 5; i++) {
            if (i + 1 == 1) embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(page0).setTimestamp());
            else if (i + 1 == 2) embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(page1).setTimestamp().setFooter({ text: `Thanks for inviting the Bot` }));
            else if (i + 1 == 3) embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(page2).setTimestamp().setFooter({ text: `Game Commands` }));
            else if (i + 1 == 4) embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(page3).setTimestamp().setFooter({ text: `Help Commands` }));
            else if (i + 1 == 5) embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(page4).setTimestamp().setFooter({ text: `Links` }));
        }

        await pagination(interaction, embeds);
    }
}