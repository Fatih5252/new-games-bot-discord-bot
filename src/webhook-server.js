// webhook-server.js is used to work with github webhook stuff. if you dont use github (or if you use an discord webhook to send github messages) or dosn't care about this feature. read the README.md (section THING YOU HAVE TO DO) on how to get rid of this feature
const express = require('express');
const bodyParser = require('body-parser');
const { EmbedBuilder } = require('discord.js');

const PORT = 3000;
const CHANNEL_ID = 'channel id';

function startWebhookServer(bot) {
  const app = express();
  app.use(bodyParser.json());

  app.post('/github', (req, res) => {
    const payload = req.body;

    const repo = payload.repository?.full_name;
    const pusher = payload.pusher?.name;
    const commits = payload.commits?.map(commit => `• ${commit.message}`).join('\n');
    const commitUrl = payload.compare;

    const embed = new EmbedBuilder()
      .setTitle(`📦 New push to ${repo}`)
      .setDescription(commits || 'No commit messages.')
      .setURL(commitUrl)
      .setColor(0x00ff00)
      .setFooter({ text: `Pushed by ${pusher}` })
      .setTimestamp();

    const channel = bot.channels.cache.get(CHANNEL_ID);
    if (channel) {
      channel.send({ embeds: [embed] }).catch(console.error);
    } else {
      console.error('❌ Channel not found!');
    }

    res.sendStatus(200);
  });

  app.listen(PORT, () => {
    console.log(`✅ Webhook-Server läuft auf Port ${PORT}`);
  });
}

module.exports = startWebhookServer;
