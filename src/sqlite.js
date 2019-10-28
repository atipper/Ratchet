const sqlite = require('sqlite')

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => Commando.SQLiteProvider(db))
).catch(console.error)
