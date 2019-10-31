const { CommandoClient, SQLiteProvider } = require('discord.js-commando')
const Sequelize = require('sequelize')
const path = require('path')
const {token, user, password} = require('../storages/config.json')

const client = new CommandoClient({
    commandPrefix: '?',
    owner: '357566425457623060',
    invite: 'https://discord.gg/MyRwKnA',
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['utilities', 'Utility Commands'],
        ['gameplay', 'Gameplay Commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands(
        commands = {
            eval: false,
            help: true,
            prefix: true
        }
    )
    .registerCommandsIn(path.join(__dirname, 'commands'))

const sequelize = new Sequelize('database', user, password, {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
})

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage INT
 * )
 */
const Tags = sequelize.define('tags', {
	name: Sequelize.STRING,
    guildID: {
        type: Sequelize.INTEGER,
        unique: true
    },
    commandPrefix: Sequelize.STRING,
})

client.once('ready', () => {
    Tags.sync()
    console.log(`Logged in as ${client.user.tag}`)
    console.log(client.user.id)
    // Set the client user's presence
    client.user.setPresence({ game: { name: `D&D 5e | ${client.commandPrefix}help` }, status: 'online' })
})

client.on('guildCreate', guild => {
    
})

/* client.on('guildCreate', guild => {
    if (!guildConfig[guild.id]) {
		guildConfig[guild.id] = {
			name: guild.name,
			prefix: client.commandPrefix
		}
	}
	fs.writeFile('./storages/guild.config.json', JSON.stringify(guildConfig, null, 2), (err) => {
        if (err) console.log(err)
    })
}) */

/* client.on('guildDelete', (guild) => { // If the bot was removed on a server, proceed
	delete guildConfig[guild.id]; // Deletes the Guild from guildConfig
	fs.writeFile('./storages/guild.config.json', JSON.stringify(guildConfig, null, 2), (err) => {
		if (err) console.log(err)
	})
}) */

client.on('error', console.error);

client.login(token)
