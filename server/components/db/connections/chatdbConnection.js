const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/chatsdb"

const chatsConnection = mongoose.createConnection(uri,{ useUnifiedTopology: true, useNewUrlParser: true })

module.exports = chatsConnection;