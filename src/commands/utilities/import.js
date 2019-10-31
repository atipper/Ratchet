const { Command } = require('discord.js-commando')

module.exports = class ImportCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'import',
            memberName: 'import',
            group: 'utilities',
            description: 'A utility that can import bestiaries, spells, and items.',
        })
    }

    run(message) {
        var messageArgs = message.content.split(' ')
        if (messageArgs[1] === "bestiary" && messageArgs[2].includes('critterdb.com')) {
            if (!messageArgs[2].includes('publishedbestiary')) {
                return message.say(`${message.author}, url must be a published bestiary!`)
            }
            message.say('Importing bestiary (this may take a while for large bestiaries).')
            var bestiaryId = messageArgs[2].split('/view')[1].replace('/', '')
            console.log(bestiaryId)
        }
        else {
            message.say(`${message.author}, the url provided must be a critterdb.com link.`)
        }
    }
}