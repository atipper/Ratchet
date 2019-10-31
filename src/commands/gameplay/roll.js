const { Command } = require('discord.js-commando');
const d20 = require('d20');

module.exports = class RollCommand extends Command {
	constructor(client) {
		super(client, {
            name: 'roll',
			aliases: ['r'],
			format: '1d20',
			group: 'gameplay',
			memberName: 'roll',
            description: 'Rolls dice in an NdN format.',
		});
	}

	run(message) {
		if (message.isMentioned(this.client.user)) {
			message.say(`${message.author}, direct tags for commands are not supported at this time.`);
		}
		else {
			var messageArgs = message.content.split(' ');
			var rollArgs = String(messageArgs[1]).split('d');
			var modArgs = message.content.split('+');
			message.delete();
			var rollResult = d20.roll(rollArgs[0] + 'd' + rollArgs[1]);
			var rollTotal = rollResult;
			if (modArgs[1] > 0) {
				rollTotal = Number(rollResult) + Number(modArgs[1]);
				if (rollResult === 20 && rollargs[1].startsWith('20')) {
					message.say(`${message.author} :game_die:\n**Result:** ${rollArgs[0]}d${rollArgs[1]} (` + rollResult + `)\n**Total:** ` + rollTotal + `\n**A critical hit!**`);
				} else if (rollResult === 1 && rollargs[1].startsWith('20')) {
					message.say(`${message.author} :game_die:\n**Result:** ${rollArgs[0]}d${rollArgs[1]} (` + rollResult + `)\n**Total:** ` + rollTotal + `\n**A critical failure!**`);
				} else {
					message.say(`${message.author} :game_die:\n**Result:** ${rollArgs[0]}d${rollArgs[1]} (` + rollResult + `)\n**Total:** ` + rollTotal);
				}
			}
			else {
				message.say(`${message.author} :game_die:\n**Result:** ${rollArgs[0]}d${rollArgs[1]} (` + rollResult + `)\n**Total:** ` + rollTotal);
			}
		}
	}
};
