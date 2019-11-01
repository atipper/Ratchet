const {Command} = require('discord.js-commando')
const guildConfig = require('../../../storages/guild.config.json')
const fs = require('fs')

module.exports = class ConfigCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'config',
            memberName: 'config',
            group: 'utilities',
            description: 'Add guild configuration to config.json.'
        })
    }

    run(message) {
        try {
            if (!guildConfig[message.guild.id]) {
                guildConfig[message.guild.id] = {
                    name: message.guild.name,
                    prefix: this.client.commandPrefix,
                    id: message.guild.id
                }
            }
            fs.writeFile('../../../storages/guild.config.json', JSON.stringify(guildConfig, null, 2), (err) => {
                if (err) console.log(err)
            })
        }
        catch(e) {
            console.log(e)
        }
    }
}