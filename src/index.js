const {CommandoClient} = require('discord.js-commando')
const path = require('path')
const {token} = require('../storages/config')
const clans = require('./models/clans')
const mongoose = require('mongoose')

mongoose.set('debug', false)

mongoose.connect('mongodb://127.0.0.1:27017/ratchet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

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
            eval: true,
            help: true,
            prefix: true,
            ping: true,
            commandState: false,
        }
    )
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    console.log(client.user.id)
    client.user.setPresence({ game: { name: `D&D 5e | ${client.commandPrefix}help` }, status: 'online' })
})

client.on('guildCreate', guild => {
    const newGuild = new clans({
        guildName: guild.name,
        guildId: guild.id,
        guildPrefix: client.commandPrefix,
        guildOwner: guild.owner,
    })

    newGuild.save().catch(err => console.log(err))
})

client.on('guildMemberRemove', member => {
    if (member.id === client.user.id) {
        var clan = clans.findOne({guildId: member.guild.id})
        clan.remove().exec().catch(err => console.log(err))
    }
})

client.on('error', console.error)

client.login(token)
