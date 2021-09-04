const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const login = express.Router();
require("env2")("./config.env");
const scheamLogin = require('./scheam/login')
const dbLogin = require('../../DB/queries/login')
login.use(cookieParser())

login.post('/', async (req, res)=>{

    let checkValid = await scheamLogin.validate(req.body)
    let value = checkValid.value
    if(checkValid.error){
        console.log('error valid');
    }else{

        let data = await dbLogin(value.username_login)
        if(data.rows[0] === undefined){
            res.json({err_user: "username error"})
        }else{
        
        let compare = await bcrypt.compareSync( value.password_login, data.rows[0].password)
        // console.log(compare);
        if(compare){
            const secretBin = process.env.SECRET;
            let payLoad = {
                username: value.username_login,
                password: data.rows[0].password,
            }
            const token = jwt.sign(payLoad, secretBin)
            res.cookie('token', token, {httpOnly: true, secure: true})
            res.json({loginTrue: true})
        }else{
            res.json({err_pass: "password error"})
        }

        }
    }
})







module.exports = login