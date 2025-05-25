// see https://github.com/Fatih5252/Games-Bot-discord-bot/blob/main/RPC-overview.md

const ID = `1217541066434154627`;
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

DiscordRPC.register(ID);

async function activity() {
    if (!RPC) return;

    RPC.setActivity({
        details: 'Oh Hi, This is the Games Bot discord Bot! it can play over 10+ Games!',
        state: 'Try /commands !',
        largeImageKey: 'https://www.puzzlemaster.ca/imagecache/products/alpha/640x640/012/012476.png',
        largeImageText: 'GAME BOT PFP',
        instance: false,
        startTimestamp: Date.now(),
        buttons: [
            {
                label: 'Invite The Bot!',
                url: 'https://discord.com/oauth2/authorize?client_id=1217541066434154627&permissions=70368744177655&scope=bot+applications.commands'
            },
            {
                label: 'Source Code',
                url: 'https://github.com/Fatih5252/new-Games-Bot-Discord-Bot',
            }
        ]
    })
}

RPC.on('ready', async (bot) => {
    console.log(`success!`)
    activity();

    setInterval(() => {
        activity();
    }, 100000000)
})
RPC.login({ clientId: ID })