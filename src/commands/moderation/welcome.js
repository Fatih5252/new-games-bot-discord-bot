const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const weschema = require('../../schemas/welcomeschema');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('welcome-channel')
    .setDMPermission(false)
    .setDescription("Configure your server's welcome channel.")
    .addSubcommand(command => command.setName('set').setDescription('Sets your welcome channel.').addChannelOption(option => option.setName('channel').setDescription('Specified channel will be your welcome channel.').setRequired(true)).addStringOption(option => option.setName('picture').setDescription(`Send a .png link to set a custom picutre but it's not required`).setRequired(false)))
    .addSubcommand(command => command.setName('remove').setDescription('Removes your welcome channel.')),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply ({ content: "You **do not** have the permission to do that! (you need the `Administrator` permissions to do this!)", flags: MessageFlags.Ephemeral });
        
 
        const sub = interaction.options.getSubcommand();
 
        switch (sub) {
 
        case 'set':
 
        const channel = interaction.options.getChannel('channel');
        const picture = interaction.options.getString('picture')
        const welcomedata = await weschema.findOne({ Guild: interaction.guild.id });

        if (picture && !picture.startsWith('https://')) {
                return await interaction.reply({ content: 'The picture url must start with https://!', flags: MessageFlags.Ephemeral });
            }
        if (picture && !(picture.endsWith('.png') || picture.endsWith('.jpg'))) {
                return await interaction.reply({
                content: 'the url link has to end with .png or .jpg.',
                flags: MessageFlags.Ephemeral
        });
    }

 
        if (welcomedata) return interaction.reply({ content: `You **already** have a welcome channel! (<#${welcomedata.Channel}>) \n> Do **/welcome-channel remove** to undo.`, flags: MessageFlags.Ephemeral})
        else {
 
            await weschema.create({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Picture: picture || null
            })
 
            const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setTitle(`> Your welcome channel has \n> been set successfully!`)
            .setAuthor({ name: `⚙️ Welcome Channel Tool`})
            .setFooter({ text: `⚙️ Use /welcome-channel remove to undo`})
            .setTimestamp()
            .setFields({ name: `• Channel was Set`, value: `> The channel ${channel} has been \n> set as your Welcome Channel.`, inline: false})
            .setThumbnail(picture ||  "https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png")
 
            await interaction.reply({ embeds: [embed] });
 
        }
 
        break;
 
        case 'remove':
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply ({ content: "You **do not** have the permission to do that! You **do not** have the permission to do that! (you need the `Administrator` permissions to do this!)", flags: MessageFlags.Ephemeral});
 
        const weldata = await weschema.findOne({ Guild: interaction.guild.id });
        if (!weldata) return await interaction.reply({ content: `You **do not** have a welcome channel yet. \n> Do **/welcome-channel set** to set up one.`, flags: MessageFlags.Ephemeral})
        else {
 
            await weschema.deleteMany({
                Guild: interaction.guild.id
            })
 
            const embed1 = new EmbedBuilder()
            .setColor("DarkRed")
            .setTitle(`> Your welcome channel has \n> been removed successfully!`)
            .setAuthor({ name: `⚙️ Welcome Channel Tool`})
            .setFooter({ text: `⚙️ Use /welcome-channel set to set your channel`})
            .setTimestamp()
            .setFields({ name: `• Your Channel was Removed`, value: `> The channel you have previously set \n> as your welcome channel will no longer \n> receive updates.`, inline: false})
            .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
 
            await interaction.reply({ embeds: [embed1] });
        }
        }
    } 
}