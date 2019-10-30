const { Command } = require('discord.js-commando');
const d20 = require('d20');

module.exports = class RollCommand extends Command {
	constructor(client) {
		super(client, {
            name: 'roll',
			aliases: ['r'],
			format: '1d20',
			group: 'utilities',
			memberName: 'roll',
            description: 'Rolls dice in an NdN format.',
		});
	}

	run(message) {
		var messageArgs = message.content.split(' ');
		var rollArgs = String(messageArgs[1]).split('d');
		message.say(`Rolled ${rollArgs[0]}d${rollArgs[1]}: ` + d20.roll(rollArgs[0] + 'd' + rollArgs[1]));
	}
};
