const usersConnection = require("../db/connections/usersdbConnection");
const mongoose = require("mongoose");


const PageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname did`nt provide."],
    },
//todo как добавишь загрузку картинок измени ссылку ебучую
    lastName: {
        type: String,
        required: [true, "Lastname did`nt provide."],
    },

    profilePhoto: {
        type: String,
        required: false,
        default: "https://avangardio-1.ru/static/no-photo.jpeg"
    },

    birthDay: {
        type: String,
        unique: false,
        required: false
    },

    uId: {
        type: String,
        unique: true,
        required: [true, 'Повторите попытку.']
    },

    friendRequests: {
        type: Array,
        unique: false,
        default: []
    },

    city: {
        type: String,
        required: false
    },

    aboutMe: {
        type: String,
        required: false,
        default: 'Здесь пусто...'
    },

    friends: {
        type: Array,
        required: false,
        default: []
    },

    chatIndexes: {
        type: Array,
        unique: false,
        default: []
    },

    posts: {
        type: Array,
        required: false,
        default: []
    },

    albums: {
        type: Array,
        required: false,
        default: []
    }

})


module.exports = usersConnection.model("pages", PageSchema);