const express = require("express");
const cookieParser = require("cookie-parser");
const logout = express.Router();
logout.use(cookieParser())

logout.get('/', (req, res)=>{
    res.clearCookie("token");
    res.redirect('/')
})


module.exports = logout