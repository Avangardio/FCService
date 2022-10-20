const MessagesScheme = require('../components/db/messagesScheme');
const chatsConnection = require('../components/db/connections/chatdbConnection');
const axios = require('axios')
const Page = require('../components/db/pageModel');
const fs = require('fs');
const randomstring = require('randomstring');
const path = require('path')
const redisClient = require('../components/redis/redisClient');
const eventHandler = require('../components/eventHandler');
const cacheUsers = require('../components/redis/redisInitiatePages');
let cachedProfiles;
(async () => {
    cachedProfiles = await cacheUsers(1);
})();

eventHandler.on('redisUpdate',async () => {
    cachedProfiles = await cacheUsers(1);
    // need performance of eventloop update!
});

async function getChatProfiles(chatProfiles, users) {
    for (let userId of [...users]) {
        await axios(`http://localhost:8080/page/${userId}`)
            .then(result => {
                const {firstName, lastName, profilePhoto, uId} = result.data.page;
                chatProfiles[userId] = {firstName, lastName, profilePhoto, uId};
            })
            .catch(error => console.log('error'))
    };
};
 //todo https://stackoverflow.com/questions/19559135/use-socket-io-in-controllers

module.exports.feedController = function (socket) {
    socket.on("FEED_INIT"     , async function (data) {
        const {user} = data;
        let chatIndexes =[];
        let output = {};

        await Page.findOne({uId: user}).select({'chatIndexes': 1, "_id": 0})
            .then(result => {
                chatIndexes = result.chatIndexes;
            })
            .catch(error => {
                socket.emit("ERROR", error.message);
            });
        for (let index of chatIndexes) {
            let chatProfiles = {};
                await chatsConnection.model(index, MessagesScheme).find({}).select({"_id": 0})//.limit(10)
                    .then(async messageData => {
                       await getChatProfiles(chatProfiles, messageData[0].chatUsers);
                            output[index] = {
                                chatProfiles,
                                messages: [...messageData]
                            };
                    })
                    .catch(error => {
                        socket.emit("ERROR", error.message);
                    });

        };
        socket.emit("FEED_INIT_ANSWER", output);
        socket.join(user);

    });
    socket.on("LOAD_NEW_CHAT" , async function (data){
        const {uId, pageId} = data;
        const currentChat = [pageId, uId].sort().join(``);
        let check = true;
       await chatsConnection.model(currentChat, MessagesScheme).find({}).limit(1)
           .then(result => {
               if(result.length !== 0) throw new Error('New Page Deprecated')
           })
           .catch(error => {check = false})
        if(!check) return;

        let chatProfiles = {};
        await getChatProfiles(chatProfiles, [uId, pageId]);
        socket.emit("LOAD_NEW_CHAT_ANSWER", {[currentChat]: {chatProfiles, messages: []}});
    });

    socket.on("SEND_MESSAGE", async function (data){
        const {senderId, chatId, message, chatProfiles} = data;
        const {chatUsers} = message;
        const Model = chatsConnection.model(chatId, MessagesScheme);
        const newMessage = new Model({...message, chatId});
        await newMessage.save()
            .catch(error => console.log(error));

        for(const userId of chatUsers){
            await Page.findOneAndUpdate({uId: userId}, {$addToSet: {chatIndexes: chatId}}, {$set: {new: true}});
         //   if(io.sockets.adapter.rooms[userId]) {
             //   console.log(`Sent to ${userId}`);
                userId !== senderId ? socket.to(userId).emit("NEW_MESSAGE", {chatId, chatProfiles, message: message}) : null;
           // }
        };
    });
    socket.on('READ_CHAT_MESSAGES', function({chatId, to, host}){
        const destionationUser = `${chatId.replace(host, "")}`;
        chatsConnection.model(chatId, MessagesScheme).updateMany({messageId: {$gte: to}, from: destionationUser}, {unRead: false}, function (err, docs) {});
        socket.to(destionationUser).emit("CHAT_USER_READ_ANSWER", {chatId, host});
    });
};
module.exports.fileController = function (socket) {
    socket.on("UPLOAD_PHOTO", function (file, fileName) {
        const newFileName = 'photo' + randomstring.generate() + `${Date.now()}` + path.extname(fileName);
        console.log('file upload att')
        fs.writeFile(`./public/${newFileName}`, file, err => {console.log(err)});
        socket.emit('UPLOAD_PHOTO_ANSWER', `http://localhost:8080/static/${newFileName}`);
    });
};
module.exports.findUsers = function (socket) {
    socket.on('FIND_USERS_INPUT', function (search){
        const searchedUsers = cachedProfiles.filter(item => `${item.firstName} ${item.lastName}`.includes(search));
        console.log(searchedUsers)
        socket.emit('FIND_USERS_INPUT_ANSWER', searchedUsers);
    });
};