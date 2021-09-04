const express = require("express");
const chat = express.Router();
const getUserChat = require("../../DB/queries/getUserChat");
const getChatMsg = require("../../DB/queries/get-chat-msg");



chat.get('/get-user', async (req, res) =>{
    res.json(req.user.username)
})

chat.get('/old-msgs/:page', async (req, res) =>{

    getChatMsg(req.params.page)
    .then(msgs =>{
        res.json(msgs)
    }).catch(console.log)


})








module.exports = chat