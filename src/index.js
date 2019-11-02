const {CommandoClient} = require('discord.js-commando')
const path = require('path')
const {token} = require('../storages/config.json')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ratchet', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('connected')
})

const Schema = mongoose.Schema
const ObjectID = mongoose.Types.ObjectId()
 
const ClanSchema = new Schema({
    _id: { type: String, index: false },
    clanId: { type: Number, index: true, unique: true },
    name: { type: String, default: '' },
    prefix: { type: String, default: '?' },
    date: { type: Date, default: Date.now },
})

var Clan = mongoose.model('Clan', ClanSchema);

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
    // Set the client user's presence
    client.user.setPresence({ game: { name: `D&D 5e | ${client.commandPrefix}help` }, status: 'online' })
})

client.on('guildCreate', guild => {
    console.log(guild.id)
    console.log(guild.name)
    console.log(client.commandPrefix)
    var newClan = new Clan(
        {_id: ObjectID},
        {clanId: guild.id},
        {name: guild.name},
        {prefix: client.commandPrefix},
    )

    newClan.save(function(err, newClan) {
        if (err) return console.log(err)
    })
})

client.on('guildDelete', guild => {

})

client.on('error', console.error)

client.login(token)
