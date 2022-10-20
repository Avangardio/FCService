const jwt = require('jsonwebtoken');
const {secret} = require('../components/secret');
const Page = require("../components/db/pageModel");


module.exports = async function (request, response, next){
    try{
        if(!request.session.user) {
            throw new Error('Пользователь не авторизован.')
        }
        request.user = request.session.user;
        next();
    } catch (error){
        return response.status(403).json({message: error.message})
    }
}