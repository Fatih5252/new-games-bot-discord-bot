const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js')
const pointSchema = require('../../schemas/pointschema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("point-balance")
    .setDescription(" Check how many points you have !"),

    async execute(interaction, client) {
        let Data = await pointSchema.findOne({ User: interaction.user.id })

        if(!Data) {
            interaction.reply({ content: `Sorry ${interaction.user} but you dont have an account!`, flags: MessageFlags.Ephemeral})
        }
        if(Data) {
            const data = new EmbedBuilder()
            .setColor('Blue')
            .setDescription(`You have ${Data.Points} points ${interaction.user}`)

            interaction.reply({ embeds: [data]})
        }
    }
}