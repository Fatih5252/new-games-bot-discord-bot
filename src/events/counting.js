const { EmbedBuilder, MessageFlags } = require('discord.js');
const countingSchema = require('../schemas/countingschema');

const messageCounts = new Map();
const cooldowns = new Map();

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        
        const countingData = await countingSchema.findOne({ Guild: message.guild.id });
        if (!countingData) return;

        if (message.channel.id !== countingData.Channel) return;

        const number = parseInt(message.content);
        if (isNaN(number) || number.toString() !== message.content) return;

        const member = message.member;
        const messageCountKey = `${message.guild.id}-${member.id}`;
        const messageCount = messageCounts.get(messageCountKey) || 0;

        if (countingData.AlternateTurn && countingData.LastUserId === member.id) {
            const sameUserEmbed = new EmbedBuilder()
                .setTitle('Not Your Turn')
                .setDescription(`Please wait for someone else to count before sending another number.`)
                .setColor('Orange')
                .setTimestamp()
                .setFooter({ text: 'Turn Rule' });

            await message.channel.send({ embeds: [sameUserEmbed] });
            return;
        }

        if (messageCount >= 10 && !cooldowns.has(messageCountKey)) {
            const cooldownTime = 10 * 1000;
            const expirationTime = Date.now() + cooldownTime;
            cooldowns.set(messageCountKey, expirationTime);

            const cooldownEmbed = new EmbedBuilder()
                .setTitle('Cooldown')
                .setDescription(`You have reached the message limit. Please wait ${cooldownTime / 1000} seconds.`)
                .addFields({ name: 'Last Valid Number', value: `${countingData.Count}` })
                .setColor('Yellow')
                .setTimestamp()
                .setFooter({ text: 'Cooldown' });

            await message.channel.send({ embeds: [cooldownEmbed], flags: MessageFlags.Ephemeral });
            return;
        }

        if (countingData.Count === 0 && number !== 1) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Wrong Number')
                .setDescription('You must start with the number 1.')
                .setTimestamp()
                .setFooter({ text: 'Invalid Start' })
                .setColor('Red');

            await message.channel.send({ embeds: [errorEmbed] });
            return;
        }

        if (number === countingData.Count + 1) {
            countingData.Count++;
            countingData.LastUserId = member.id;
            await countingData.save();

            const response = new EmbedBuilder()
                .setTitle(`Current Number: ${countingData.Count}`)
                .setColor('Green');

            await message.react('✅');
            const reaction = await message.channel.send({ embeds: [response] });

            if (countingData.Count === Math.floor(countingData.MaxCount / 4)) {
                const quarterGoalEmbed = new EmbedBuilder()
                    .setTitle('Quarter Goal Reached!')
                    .setDescription(`You have reached a quarter of the goal. Only ${countingData.MaxCount - countingData.Count} numbers left!`)
                    .setTimestamp()
                    .setFooter({ text: 'Quarter Milestone' })
                    .setColor('Blue');

                await message.channel.send({ embeds: [quarterGoalEmbed] });
            }

            if (countingData.Count === Math.floor(countingData.MaxCount / 2)) {
                const halfwayGoalEmbed = new EmbedBuilder()
                    .setTitle('Halfway There!')
                    .setDescription(`You are halfway to the goal. ${countingData.MaxCount - countingData.Count} numbers left!`)
                    .setTimestamp()
                    .setFooter({ text: 'Halfway Milestone' })
                    .setColor('Purple');

                await message.channel.send({ embeds: [halfwayGoalEmbed] });
            }

            if (countingData.Count === countingData.MaxCount) {
                const congratulationsEmbed = new EmbedBuilder()
                    .setTitle('Congratulations!')
                    .setDescription(`${message.author.username}, you have reached the goal of **${countingData.MaxCount}**! Well done!`)
                    .setTimestamp()
                    .setFooter({ text: 'Game Complete' })
                    .setColor('Gold');

                const congratsReact = await message.channel.send({ embeds: [congratulationsEmbed] });
                await message.react('🏆');

                countingData.Count = 0;
                countingData.LastUserId = null;
                await countingData.save();
            }
        } else {
            const wrongNumberEmbed = new EmbedBuilder()
                .setTitle('Wrong Number')
                .setDescription(`${message.author.username} ruined the count at **${countingData.Count}**.`)
                .setColor('Red')
                .setTimestamp()
                .setFooter({ text: 'Wrong Number' });

            await message.react('❌');
            await message.channel.send({ embeds: [wrongNumberEmbed] });

            countingData.Count = 0;
            countingData.LastUserId = null;
            await countingData.save();
        }

        messageCounts.set(messageCountKey, messageCount + 1);

        if (messageCount === 19) {
            const cooldownTime = 10 * 1000;
            const expirationTime = Date.now() + cooldownTime;
            cooldowns.set(messageCountKey, expirationTime);

            const cooldownEmbed = new EmbedBuilder()
                .setTitle('Cooldown')
                .setDescription(`You have reached the message limit. Please wait ${cooldownTime / 1000} seconds.`)
                .setColor('Yellow')
                .setTimestamp()
                .setFooter({ text: 'Cooldown' });

            await message.channel.send({ embeds: [cooldownEmbed], flags: MessageFlags.Ephemeral });
        }

        setTimeout(() => {
            messageCounts.delete(messageCountKey);
        }, 60 * 1000);
    },
};
