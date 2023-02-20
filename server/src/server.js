const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const fs = require('fs');
const hostname = '127.0.0.1';
const url = "mongodb://127.0.0.1:27017/";
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(url);
const passport = require("passport");
const path = require("path")

const session = require('express-session');
const MongoStore = require('connect-mongo');

const jwt_decode = require('jwt-decode');
const config = require('../config');

const homeRouter    = require("../routes/homeRouter"    );
const accountRouter = require("../routes/accountRouter" );
const pageRouter    = require('../routes/pageRouter'    );

app.use(session({
    secret: config.session.secret,
    cookie: config.session.cookie,
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/usersdb' })    })
)

const usersConnection = require('../components/db/connections/usersdbConnection');
const chatsConnection = require('../components/db/connections/chatdbConnection');
// подключение



app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//const text = `"C:\\%ProgramFiles%\\MongoDB\\Server\\6.0\\bin\\mongod.exe --config "C:\\%ProgramFiles%\\MongoDB\\Server\\6.0\\bin\\mongod.cfg"`
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const controller = require("../socketController/socketConnection");


io.on('connection', function (socket){
    console.log(io.sockets.adapter.rooms);
    controller.feedController(socket);
    controller.fileController(socket);
    controller     .findUsers(socket);
});
//setting up redis client

const redisInitPages = require('../components/redis/redisInitiatePages');
const cacheUsers = require("../components/redis/redisInitiatePages");


const jopa = require('../components/eventHandler');

    jopa.on('redisUpdate', () => {
    console.log(1)
});


//todo для кукисов сделай проверку по ip (ну когда будет в проде)

app.use('/home',        homeRouter    );
app.use('/account/',    accountRouter );
app.use('/page/',       pageRouter    );

app.use('/static', express.static(path.join(__dirname, "../public")));

app.post("/api",jsonParser, (req, res) => {
let token = req.body.token;
console.log(token)
    let decoded = jwt_decode(token);

    res.send(decoded);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, hostname, async () => {
    await redisInitPages();
    console.log(`Server running at http://127.0.0.1:${PORT}/`);

});
