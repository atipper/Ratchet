const mongoose = require('mongoose')
const guildSchema = mongoose.Schema({
    guildId: {type: Number, unique: true, index: true},
    guildName: String,
    guildPrefix: String,
    guildOwner: String,
})

module.exports = mongoose.model('Guilds', guildSchema)
