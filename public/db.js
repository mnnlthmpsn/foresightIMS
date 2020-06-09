var Datastore = require('nedb')


const db = new Datastore({
  filename: './src/mydatastore.nedb',
  autoload: true
})

module.exports = db