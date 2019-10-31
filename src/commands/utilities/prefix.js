const { Command } = require('discord.js-commando')
const fs = require('fs')
var guildConfig = require('../../../storages/guild.config.json')

module.exports = class PrefixCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prefix',
            group: 'utilities',
            memberName: 'prefix',
            description: 'Change the command prefix for the server.',
        })
    }

    run(message) {
        var messageArgs = message.content.split(' ')
        guildConfig[message.guild.id].prefix = messageArgs[1];
        if (!guildConfig[message.guild.id].prefix) {
            guildConfig[message.guild.id].prefix = this.client.commandPrefix; // If you didn't specify a Prefix, set the Prefix to the Default Prefix
        }
        fs.writeFile('./storages/guild.config.json', JSON.stringify(guildConfig, null, 2), (err) => {
            if (err) console.log(err)
            message.reply(`the prefix has been changed to ${guildConfig[message.guild.id].prefix}.`);
        })
    }
}