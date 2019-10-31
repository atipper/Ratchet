const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite')
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
        ['gameplay', 'Gameplay Commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands(
        commands = {
            eval: true,
            help: true
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
    
})

client.on('error', console.error);

/* client.setProvider (
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => Commando.SQLiteProvider(db))
)
.catch(console.error) */

client.login(config.token);
