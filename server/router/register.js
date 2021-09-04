const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const login = express.Router();
require("env2")("./config.env");

const scheamRegister = require('./scheam/register')
const dbRegister = require('../../DB/queries/register')
login.use(cookieParser())


login.post('/', async (req, res)=>{

    const {error, value} = await scheamRegister.validate(req.body)
    if(error){
        console.log('error 1 : ' + error.message);
        res.json(error.message)
    }else{

        const hashPassword = await bcrypt.hash(value.password_register, 10)
        value.password_register = hashPassword
        dbRegister(value)
        .then(data=>{

            let payLoad = {
                username: value.username_register,
                password:value.password_register,
            }
            const token = jwt.sign(payLoad, process.env.SECRET)
            res.cookie('token', token, {httpOnly: true, secure: true})
            res.json({register_done: "true"})
            console.log("done register");
        })
        .catch(err =>{
            console.log('error 2 : ' + err);
            res.json(err.detail)
            console.log('error 3 : ' + err.detail);
        })
    }
})


module.exports = login