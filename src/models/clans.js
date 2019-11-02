const mongoose = require('mongoose')
const guildSchema = mongoose.Schema({
    guildName: String,
    guildId: Number,
    guildPrefix: String,
    guildOwner: String,
})

module.exports = mongoose.model('Guilds', guildSchema)