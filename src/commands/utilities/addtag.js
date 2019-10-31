const {Command} = require('discord.js-commando')
const {Tags} = require('../../index')
const {Sequelize} = require('../../index')

module.exports = class AddTagCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addtag',
            group: 'utilities',
            memberName: 'addtag',
            guildOnly: true,
            description: 'Adds a guild to the sqlite database.',
        })
    }

    run(message) {
        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?)
            const tag = Tags.create({
                name: message.channel.guild.name,
                guildId: message.channel.guild.id,
                commandPrefix: this.client.commandPrefix,
            })
            console.log(tag)
            return message.say(`Tag ${tag.name} added.`)
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.say('That tag already exists.')
            }
            return message.say(`Something went wrong with adding a tag.\n${e}`)
        }
    }
}