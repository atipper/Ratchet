const { Command } = require('discord.js-commando');

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            format: 'X',
            group: 'utilities',
            memberName: 'clear',
            clientPermissions: ['MANAGE_MESSAGES'],
            guildOnly: true,
            description: 'Clears X messages in channel history.',
        });
    }

    run(message) {
        var content = message.content.split(' ');
        console.log(content.length);
        if (content.length === 1) {
            message.say(`${message.author}, you must provide an argument for this command.`);
        }
        else {
            message.say('Clearing messages...');
            var num = Number(content[1] + 1);
            message.channel.bulkDelete(content[1])
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`));
        }
    }
};
