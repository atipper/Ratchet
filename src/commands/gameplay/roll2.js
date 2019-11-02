const {Command} = require('discord.js-commando')
const Roll = require('roll')

module.exports = class Roll2Command extends Command {
    constructor(client) {
        super(client, {
            name: 'roll2',
            memberName: 'roll2',
            group: 'gameplay',
            description: 'A different approach to dice rolls.'
        })
    }

    run(message) {
        var messageArgs = message.content.split(' ')
        var rollArgs = String(messageArgs[1]).split('d')
        var roll = new Roll()
        message.say(roll.roll(rollArgs[0] + 'd' + rollArgs[1]).result)
    }
}