const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const path = require('path');
const fs = require('fs')
const {token} = require('../storages/config.json');
const guildConfig = require('../storages/guild.config.json')

const client = new CommandoClient({
    commandPrefix: '?',
    owner: '357566425457623060',
    invite: 'https://discord.gg/uGFgjqX',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['utilities', 'Utility Commands'],
        ['gameplay', 'Gameplay Commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands(
        commands = {
            eval: true,
            help: true,
            prefix: false
        }
    )
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(client.user.id);
    // Set the client user's presence
    client.user.setPresence({ game: { name: `D&D 5e | ${client.commandPrefix}help` }, status: 'online' })
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});

client.on('guildCreate', guild => {
    if (!guildConfig[guild.id]) {
		guildConfig[guild.id] = {
			name: guild.name,
			prefix: client.commandPrefix
		}
	}
	fs.writeFile('./storages/guild.config.json', JSON.stringify(guildConfig, null, 2), (err) => {
        if (err) console.log(err)
    })
})

client.on('guildDelete', (guild) => { // If the bot was removed on a server, proceed
	delete guildConfig[guild.id]; // Deletes the Guild from guildConfig
	fs.writeFile('./storages/guild.config.json', JSON.stringify(guildConfig, null, 2), (err) => {
		if (err) console.log(err)
	})
})

client.on('error', console.error);

client.login(token);
