const { SlashCommandBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const countingSchema = require('../../schemas/countingschema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('counting-disable')
        .setDescription('Disable the counting system.')
        .setDMPermission(false),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
            return await interaction.reply({
                content: 'The Counting System cannot be disabled because you do not have the necessary permissions to do so.',
                flags: MessageFlags.Ephemeral
            });

            countingSchema.deleteMany({ Guild: interaction.guild.id }, async (err, data) => {
            await interaction.reply({
                content: 'The Counting System has been successfully disabled.',
                flags: MessageFlags.Ephemeral,
            });
        });
    }
};