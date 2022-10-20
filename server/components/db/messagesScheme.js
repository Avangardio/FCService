const mongoose = require("mongoose");


const MessagesScheme = new mongoose.Schema({

    chatId: {
        type:       String,
        required:   true,
        unique:     false
    },
    messageId: {
        type:       Number,
        required:   true,
        unique:     false
    },
    from: {
        type:       String,
        required:   true,
        unique:     false
    },
    date: {
        type:       Date,
        required:   true,
        unique:     false
    },
    contentType: {
        type:       String,
        required:   true,
        default:    'Text',
        unique:     false
    },
    body: {
        type:       String,
        required:   true,
        default:    "",
        unique:     false
    },
    answerTo: {
        type:       Number,
        required:   false,
        unique:     false,
        default:    false
    },

    replyFrom: {
        type:       Number,
        required:   false,
        unique:     false,
        default:    false
    },

    unRead: {
        type:       Boolean,
        required:   false,
        default:    true
    },

    picture: {
        type: String,
        required: false
    },

    chatUsers: {
        type    :    Array,
        required:    false,
    },

    modified: {
        type: Boolean,
        required: false
    }
});

module.exports = MessagesScheme;

/*const newCollection = mongoose.model("collectionName" , Schema)
newCollection.find({} , (err, docs)=>{
    console.log(docs)
})*/