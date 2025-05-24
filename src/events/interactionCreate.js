const { Interaction } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if  (interaction.customId) {
            if (interaction.customId.includes('bugSolved - ')) {
                var stringId = interaction.customId;
                stringId = stringId.replace('bugSolved - ', '');

                var member = await client.users.fetch(stringId);
                await member.send(`This message was initialized by the developers indicating that the bug you reported has been solved.`).catch(err => {});
                await interaction.reply({ content: `I have notified the member that their report is now solved`, ephemeral: true });
                await interaction.message.delete().catch(err => {}); 
            }
        }
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return
        
        try{


            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: 'There was an error while executing this command!', 
                ephemeral: true
            });
        }
        


    },
    


};