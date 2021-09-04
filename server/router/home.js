const express = require("express");
const path = require("path");
const home = express.Router();
const getAvatar = require('../../DB/queries/get-avatar')



home.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/home/index.html'))
})


home.get('/getAvatar', (req, res)=>{
    getAvatar(req.user.username).then(data => res.json(data.rows[0])).catch(console.log)
    

})


module.exports = home