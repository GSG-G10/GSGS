const express = require("express");
const path = require("path");
const user = express.Router();

// user.get('/:username', (req, res)=>{
//     console.log('user logind: ' + req.user.username);
//     console.log('page user to view: ' + req.params.username);
//     res.sendFile(path.join(__dirname, '../../public/user/index.html'))
// })





module.exports = user