const express = require("express");
const random = express.Router();
const getRandomUsersAside = require('../../DB/queries/random-user-aside')


random.get('/users', (req, res)=>{
  
    getRandomUsersAside()
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        console.log(err);
    })

})


module.exports = random
