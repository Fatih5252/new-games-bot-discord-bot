// webhook-server.js
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
