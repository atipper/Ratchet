const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('../storages/config.json');

const client = new CommandoClient({
	commandPrefix: '?',
	owner: '357566425457623060',
	invite: 'https://discord.gg/uGFgjqX',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['utilities', 'Utility Commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(client.user.id);
});

client.on('error', console.error);

client.login(config.token);
