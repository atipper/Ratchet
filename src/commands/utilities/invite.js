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
        message.say(`${message.author}, please join our server and provide feedback!\nhttps://discord.gg/uGFgjqX\nYou can also invite me to your other servers with this URL:\nhttps://discordapp.com/api/oauth2/authorize?client_id=372565700562124800&permissions=470281303&scope=bot`);
    }
};