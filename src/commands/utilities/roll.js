const { Command } = require('discord.js-commando');
const d20 = require('d20');

module.exports = class RollCommand extends Command {
	constructor(client) {
		super(client, {
            name: 'roll',
            aliases: ['r'],
			group: 'utilities',
			memberName: 'roll',
            description: 'Rolls a die roll for 1d20.',
		});
	}

	run(message, {text}) {
        return d20.roll(text)
	}
};
