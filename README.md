# Discord-Bot
A bot utilitizing Commando for Discord.js to perform commands relating to Dungeons and Dragons 5th edition.

## Installation
Use the following command to install dependencies:

```bash
npm install
```

## Create config.json
Create a config.json file in ./storages which should have the following format:

```json
{
    "token": "your-token-here"
}
```

## Creating commands
Create a command group within the commands/ folder, if required. Create <command-name>.js and fill the contents below:
```javascript
const { Command } = require('discord.js-commando');

module.exports = class PongCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pong',
			group: 'utilities',
			memberName: 'pong',
			description: 'Replies to a ping. Pong!',
		});
	}

	run(message) {
		return message.say('Ping!');
	}
};
```

## License
ISC: URL