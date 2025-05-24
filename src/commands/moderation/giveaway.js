const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Start a giveaway')
    .addSubcommand(command => command.setName(`start`).setDescription('Start a giveaway').addStringOption(option => option.setName('duration').setDescription(`The duration of the giveaway (1m, 1h, 1d etc)`).setRequired(true)).addIntegerOption(option => option.setName('winners').setDescription('The winners in the giveaway (in numbers)').setRequired(true)).addStringOption(option => option.setName('prize').setDescription('what the winners will win aka the prize').setRequired(true)).addChannelOption(option => option.setName('channel').setDescription('The channel the giveaway shold happen in').setRequired(false)).addStringOption(option => option.setName('content').setDescription('The content will be used for the giveaway embed').setRequired(false)))
    .addSubcommand(command => command.setName('edit').setDescription('edits the giveaway').addStringOption(option => option.setName('message-id').setDescription('The id of the giveaway').setRequired(true)).addStringOption(option => option.setName('time').setDescription('The added duration of the giveaway in MS').setRequired(true)).addIntegerOption(option => option.setName('winners').setDescription('The updated number of winners for the giveaway').setRequired(true)).addStringOption(option => option.setName('prize').setDescription('the new prize for the giveaway').setRequired(false)))
    .addSubcommand(command => command.setName('end').setDescription('end the giveaway').addStringOption(option => option.setName('message-id').setDescription('The ID of the giveaway message').setRequired(true)))
    .addSubcommand(command => command.setName('reroll').setDescription('reroll the giveaway').addStringOption(option => option.setName('message-id').setDescription('the id of the giveaway message').setRequired(true))),
    async execute (interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: `you need the \`ManageChannels\` permission to run this command`, ephemeral: true });
        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'start':

            await interaction.reply({ content: `Starting your giveaway...`, ephemeral: true });

            const duration = ms(interaction.options.getString('duration') || "");
            const winnerCount = interaction.options.getInteger('winners');
            const prize = interaction.options.getString('prize');
            const contentmain = interaction.options.getString('content');
            const channel = interaction.options.getChannel('channel');
            const showChannel = interaction.options.getChannel('channel') || interaction.channel;
            if (!channel && !contentmain)

                client.giveawayManager.start(interaction.channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: false,
                        content: contentmain,
                        threshold: 60000000000_000,
                        embedColor: `0000ff`
                    }
                })

                else if (!channel)
                client.giveawayManager.start(interaction.channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: true,
                        content: contentmain,
                        threshold: 60000000000_000,
                        embedColor: `0000ff`
                    }
                })

                else if (!contentmain)
                client.giveawayManager.start(channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostBy: interaction.user,
                    lastChance: {
                        enabled: false,
                        content: contentmain,
                        threshold: 60000000000_000,
                        embedColor: `0000ff`
                    }
                })

                else
                client.giveawayManager.start(channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: true,
                        content: contentmain,
                        threshold: 60000000000_000,
                        embedColor: `0000ff`
                    }
                });

                interaction.editReply({ content: `Your giveaway has been started! check ${showChannel} for your giveaway`, ephemeral: true });

                break;
                case 'edit':

                await interaction.reply({ content: `Editing your giveaway...`, ephemeral: true });

                const newprize = interaction.options.getString('prize');
                const newduration = interaction.options.getString('time');
                const newwinners = interaction.options.getInteger('winners');
                const messageId = interaction.options.getString('message-id');

                client.giveawayManager.edit(messageId, {
                    addTime: ms(newduration),
                    newWinnerCount: newwinners,
                    newPrize: newprize,
                }).then(() => {
                    interaction.editReply({ content: `Your giveaway has been edited!`, ephemeral: true });
                }).catch(err => {
                    interaction.editReply({ content: `There was an error while editing your giveaway!\n\nError: \`${err}\``, ephemeral: true });
                });

                break;
                case 'end':

                await interaction.reply({ content: `Ending your giveaway...`, ephemeral: true });

                const messageId1 = interaction.options.getString('message-id');

                client.giveawayManager.end(messageId1).then(() => {
                    interaction.editReply({ content: `Your giveaway has been ended`, ephemeral: true });
                }).catch(err => {
                    interaction.editReply({ content: `An error occured while ending the giveaway!\n\nError: \`${err}\``, ephemeral: true });
                });

                break;
                case 'reroll':

                await interaction.reply({ content: `Rerolling your giveaway...`, ephemeral: true });

                const query = interaction.options.getString('message-id');
                const giveaway = client.giveawayManager.giveaways.find((g) => g.guildId === interaction.guildId && g.prize === query) || client.giveawayManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === query)

                if (!giveaway) return await interaction.reply({ content: `I could not find a giveaway with the message ID you provided`, ephemral: true });
                const messageId2 = interaction.options.getString('message-id');
                client.giveawayManager.reroll(messageId2).then(() => {
                    interaction.editReply({ content: `Your giveaway has been rerolled`, ephemeral: true });
                }).catch(err => {
                    interaction.editReply({ content: `There was an error while rerolling your gieaway\n\nError: \`${err}\``, ephemral: true });
                })
        }
    }
}