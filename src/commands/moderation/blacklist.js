const { SlashCommandBuilder } = require('discord.js');
const Blacklist = require('../../schemas/blacklistModel');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription('Blacklist or remove users from the bot\'s blacklist')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Blacklist a user')
        .addUserOption(option => option.setName('user').setDescription('The user to be blacklisted').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for blacklisting'))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a user from the blacklist')
        .addUserOption(option => option.setName('user').setDescription('The user to be removed from the blacklist').setRequired(true))
    ),
  async execute(interaction) {
    const userId = interaction.user.id;

    const botDeveloperId = `all of the bot developer id's`;
    if (userId !== botDeveloperId) {
      return await interaction.reply('You are not authorized to use this command.');
    }

    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'add') {
      const user = interaction.options.getUser('user');
      const reason = interaction.options.getString('reason');

      try {
        const existingEntry = await Blacklist.findOne({ userId: user.id });

        if (existingEntry) {
          await interaction.reply(`${user.username} is already blacklisted.`);
        } else {
          const newEntry = new Blacklist({ userId: user.id, reason });
          await newEntry.save();

          await interaction.reply(`${user.username} has been blacklisted. Reason: ${reason}`);
        }
      } catch (error) {
        console.error('Error occurred while adding user to blacklist:', error);
        await interaction.reply('An error occurred while adding the user to the blacklist.');
      }
    } else if (subcommand === 'remove') {
      const user = interaction.options.getUser('user');

      try {
        const removedEntry = await Blacklist.findOneAndDelete({ userId: user.id });

        if (removedEntry) {
          await interaction.reply(`${user.username} has been removed from the blacklist.`);
        } else {
          await interaction.reply(`${user.username} is not blacklisted.`);
        }
      } catch (error) {
        console.error('Error occurred while removing user from blacklist:', error);
        await interaction.reply('An error occurred while removing the user from the blacklist.');
      }
    }
  },
};