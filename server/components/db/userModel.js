const usersConnection = require("../db/connections/usersdbConnection");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique:   [true, "Email Exists"],
    },

    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    uId: {
        type: String,
        unique: true,
        required: [true, 'Got an uId creation trouble.']
    },
    role: {
        type: String,
        unique: false,
        default: "USER"
    },
    allowedIps: {
        type: Array,
        unique: false,
        default: []
    }
})
    UserSchema.statics.checkPassword = async function (password, hash){
       return await bcrypt.compare(password, hash);
}

module.exports = usersConnection.model("Users", UserSchema);