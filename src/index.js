const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, Partials, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, User, MessageFlags } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: 53608191 }); 
const { CaptchaGenerator } = require('captcha-canvas');
const startWebhookServer = require('./webhook-server');

client.commands = new Collection();

require('dotenv').config();

client.on('ready', () => {
    client.user.setPresence({ activities: [{ name: '/commands' }], status: 'dnd' })
})
client.once('ready', () => {
    startWebhookServer(client);
})

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();
const GiveawaysManager = require('./giveaways');
client.giveawayManager = new GiveawaysManager(client, {
    default: {
        botsCanWin: false,
        embedColor: `0000ff`,
        embedColorEnd: `0000ff`,
        reaction: `🎉`,
    },
})
const capschema = require('./schemas/verify'); 
const verifyusers = require('./schemas/verifyusers'); 
const LeftUsers = require('./schemas/leftusers');

    client.on(Events.InteractionCreate, async interaction => {
        try {

        if (interaction.customId === 'verify') {
 
        if (interaction.guild === null) return;
     
        const verifydata = await capschema.findOne({ Guild: interaction.guild.id });
        const verifyusersdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
     
            if (!verifydata) return await interaction.reply({ content: `The **verification system** has been disabled in this server!`, flags: MessageFlags.Ephemeral });
     
            if (verifydata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: 'You have **already** been verified!', flags: MessageFlags.Ephemeral});
     
                let letter = ['0','1','2','3','4','5','6','7','8','9','a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','f','F','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z',]
                let result = Math.floor(Math.random() * letter.length);
                let result2 = Math.floor(Math.random() * letter.length);
                let result3 = Math.floor(Math.random() * letter.length);
                let result4 = Math.floor(Math.random() * letter.length);
                let result5 = Math.floor(Math.random() * letter.length);
     
                const cap = letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5];
     
                const captcha = new CaptchaGenerator()
                .setDimension(150, 450)
                .setCaptcha({ text: `${cap}`, size: 60, color: "red"})
                .setDecoy({ opacity: 0.5 })
                .setTrace({ color: "red" })
     
                const buffer = captcha.generateSync();
     
                const verifyattachment = new AttachmentBuilder(buffer, { name: `captcha.png` });
     
                const verifyembed = new EmbedBuilder()
                .setColor('Green')
                .setAuthor({ name: `✅ Verification Proccess`})
                .setFooter({ text: `✅ Verification Captcha`})
                .setTimestamp()
                .setImage('attachment://captcha.png')
                .setThumbnail('https://www.kindpng.com/picc/m/68-687017_green-tick-transparent-background-clipart-free-to-use.png')
                .setTitle('> Verification Step: Captcha')
                .addFields({ name: `• Verify`, value: '> Please use the button bellow to \n> submit your captcha!'})
     
                const verifybutton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('✅ Enter Captcha')
                    .setStyle(ButtonStyle.Success)
                    .setCustomId('captchaenter')
                )

                await interaction.reply({ embeds: [verifyembed], components: [verifybutton], files: [verifyattachment], flags: MessageFlags.Ephemeral });
     
                if (verifyusersdata) {
     
                    await verifyusers.deleteMany({
                        Guild: interaction.guild.id,
                        User: interaction.user.id
                    })
     
                    await verifyusers.create ({
                        Guild: interaction.guild.id,
                        User: interaction.user.id,
                        Key: cap
                    })
     
                } else {
     
                    await verifyusers.create ({
                        Guild: interaction.guild.id,
                        User: interaction.user.id,
                        Key: cap
                    })
     
                }
            }
            } catch (err) {
                console.error(err)
            }
             
        
    });

    client.on(Events.InteractionCreate, async interaction => {
        if (interaction.customId === 'captchaenter') {
            const vermodal = new ModalBuilder()
                .setTitle(`Verification`)
                .setCustomId('vermodal')
     
                const answer = new TextInputBuilder()
                .setCustomId('answer')
                .setRequired(true)
                .setLabel('• Please sumbit your Captcha code')
                .setPlaceholder(`Your captcha code input`)
                .setStyle(TextInputStyle.Short)
     
                const vermodalrow = new ActionRowBuilder().addComponents(answer);
                vermodal.addComponents(vermodalrow);

            await interaction.showModal(vermodal);
        }
    });
     
    client.on(Events.InteractionCreate, async interaction => {
     try {
        if (!interaction.isModalSubmit()) return;
     
        if (interaction.customId === 'vermodal') {
     
            const userverdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
            const verificationdata = await capschema.findOne({ Guild: interaction.guild.id });
     
            if (verificationdata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: `You have **already** verified within this server!`, flags: MessageFlags.Ephemeral});
     
            const modalanswer = interaction.fields.getTextInputValue('answer');
            if (modalanswer === userverdata.Key) {
     
                const verrole = await interaction.guild.roles.cache.get(verificationdata.Role);
     
                try {
                    await interaction.member.roles.add(verrole);
                } catch (err) {
                    return await interaction.reply({ content: `There was an **issue** giving you the **<@&${verificationdata.Role}>** role, try again later!`, flags: MessageFlags.Ephemeral})
                }
     
                await interaction.reply({ content: 'You have been **verified!**', flags: MessageFlags.Ephemeral});
                await capschema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id }});
     
            } else {
                await interaction.reply({ content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`, flags: MessageFlags.Ephemeral})
            }
        }
        } catch (err) {
            console.error(err)
        }
        
        
    });

client.on('guildMemberRemove', async member => {
    try {
        const userId = member.user.id;
        
        const verifyusersdata = await verifyusers.findOne({ Guild: member.guild.id, User: userId });
        if (verifyusersdata) {
            await LeftUsers.create({
                Guild: member.guild.id,
                User: userId,
                Key: verifyusersdata.Key,
                Left: true,
            });
        }
    } catch (err) {
        console.error(err);
    }
});

    client.on('guildMemberAdd', async member => {
        try {
        const userId = member.user.id;

        const leftUserData = await LeftUsers.findOne({ Guild: member.guild.id, User: userId });

        if (leftUserData) {
            const verificationdata = await capschema.findOne({ Guild: member.guild.id });
            const verrole = await member.guild.roles.cache.get(verificationdata.Role);
            await member.roles.add(verrole);
            await LeftUsers.deleteOne({ Guild: member.guild.id, User: userId });
        }
        } catch (err) {
            console.error(err);
        }
});
// Leave Message //
 
client.on(Events.GuildMemberRemove, async (member, err) => {
    const welcomeschema = require('./schemas/welcomeschema')
 
    const leavedata = await welcomeschema.findOne({ Guild: member.guild.id });
 
    if (!leavedata) return;
    else {
 
        const channelID = leavedata.Channel;
        const channelwelcome = member.guild.channels.cache.get(channelID);
 
        const embedleave = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle(`${member.user.username} has left`)
        .setDescription( `> ${member} has left the Server`)
        .setFooter({ text: `👋 Cast your goobyes`})
        .setTimestamp()
        .setAuthor({ name: `👋 Member Left`})
        .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081275127850864640/largeblue.png')

        const embedleavedm = new EmbedBuilder()
         .setColor("DarkBlue")
         .setTitle('left message')
         .setDescription( `> goodbye from ${member.guild.name}!`)
         .setFooter({ text: `👋 Bye!`})
         .setTimestamp()
         .setAuthor({ name: `👋 goodbye! hope we will see you again!`})
         .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081275127850864640/largeblue.png')

        if (leavedata.Picture) {
            embedleave.setThumbnail(leavedata.Picture)
            embedleavedm.setThumbnail(leavedata.Picture)
        }
 
        const welmsg = await channelwelcome.send({ embeds: [embedleave]}).catch(err);
        welmsg.react('👋');
        member.send({ embeds: [embedleavedm]}).catch(err => console.log(`leave DM error: ${err}`))
    }
})
 
// Welcome Message //
 
client.on(Events.GuildMemberAdd, async (member, err) => {
    const welcomeschema = require('./schemas/welcomeschema')
    const roleschema = require('./schemas/autorole')
 
    const welcomedata = await welcomeschema.findOne({ Guild: member.guild.id });
 
    if (!welcomedata) return;
    else {
 
        const channelID = welcomedata.Channel;
        const channelwelcome = member.guild.channels.cache.get(channelID)
        const roledata = await roleschema.findOne({ Guild: member.guild.id });
 
        if (roledata) {
            const giverole = await member.guild.roles.cache.get(roledata.Role)
 
            member.roles.add(giverole).catch(err => {
                console.log('Error received trying to give an auto role!');
            })
        }
 
        const embedwelcome = new EmbedBuilder()
         .setColor("DarkBlue")
         .setTitle(`${member.user.username} has arrived\nto the Server!`)
         .setDescription( `> Welcome ${member} to the Sevrer!`)
         .setFooter({ text: `👋 Get cozy and enjoy :)`})
         .setTimestamp()
         .setAuthor({ name: `👋 Welcome to the Server!`})
         .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081275127850864640/largeblue.png')
 
        const embedwelcomedm = new EmbedBuilder()
         .setColor("DarkBlue")
         .setTitle('Welcome Message')
         .setDescription( `> Welcome to ${member.guild.name}!`)
         .setFooter({ text: `👋 Get cozy and enjoy :)`})
         .setTimestamp()
         .setAuthor({ name: `👋 Welcome to the Server!`})
         .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081275127850864640/largeblue.png')

         if (welcomedata.Picture) {
            embedwelcome.setThumbnail(welcomedata.Picture)
            embedwelcomedm.setThumbnail(welcomedata.Picture)
         }
 
        const levmsg = await channelwelcome.send({ embeds: [embedwelcome]});
        levmsg.react('👋');
        member.send({ embeds: [embedwelcomedm]}).catch(err => console.log(`Welcome DM error: ${err}`))
 
    } 
})