const redisURL = '127.0.0.1:6479'
const redisClient = require('redis').createClient(redisURL);
redisClient.on('connect', function() {
    console.log('Redis client created!');
});
redisClient.on("error", (error) => console.error(`Error : ${error}`));

module.exports = redisClient;