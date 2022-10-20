const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/usersdb"

const usersConnection = mongoose.createConnection(uri, { useUnifiedTopology: true, useNewUrlParser: true })

module.exports = usersConnection;