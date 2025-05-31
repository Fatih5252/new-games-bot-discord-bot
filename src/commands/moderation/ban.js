const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription(`This bans a user`)
    .addUserOption(option => option.setName('user').setDescription(`The member you want to ban. you can paste an user id`).setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription(`The reason for banning the member`).setRequired(false)),
    async execute(interaction, client) {
 
        const users = interaction.options.getUser('user');
        const ID = users.id;
        const banUser = client.users.cache.get(ID)
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: "You must have the ban members permission to use this command", flags: MessageFlags.Ephemeral});
        if (interaction.member.id === ID) return await interaction.reply({ content: "You cannot ban yourself!", flags: MessageFlags.Ephemeral});
 
        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given";
 
        const dmEmbed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark:  You have been banned from **${interaction.guild.name}** | ${reason}`)
 
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark:  ${banUser.tag} has been banned | ${reason}`)
 
        await interaction.guild.bans.create(banUser.id, {reason}).catch(err => {
            return interaction.reply({ content: "I cannot ban this member!", flags: MessageFlags.Ephemeral})
        })
 
        await banUser.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        })
 
        await interaction.reply({ embeds: [embed] });
    } 
}