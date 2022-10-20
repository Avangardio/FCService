

const io = require('socket.io');

 class SocketIO {
     socket;
     static instance = new SocketIO();

     constructor() {
        this.socket = io("http://localhost:8080", {cors: {origin: "http://localhost:3000"}});
    }

}
module.exports = {SocketIO};