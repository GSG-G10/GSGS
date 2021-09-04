const express = require("express");
const path = require("path");
const land = express.Router();


land.get('/', (req, res)=>{
    console.log("land area >>----------------- ");
    let token = req.cookies['token']
    if(token){
        res.redirect('/home')
    }else{
    res.sendFile(path.join(__dirname, '../../public/land/index.html'))
    }
})



module.exports = land