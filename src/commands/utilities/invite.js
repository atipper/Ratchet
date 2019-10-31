const { Command } = require('discord.js-commando');

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'utilities',
            memberName: 'invite',
            description: 'An invitation link to the development server.',
        });
    }

    run(message) {
        message.say(`${message.author}, please join our server and provide feedback!\nhttps://discord.gg/uGFgjqX`);
    }
};