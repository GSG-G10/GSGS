const express = require("express");
const gif = express.Router();
const getGIf = require('../../DB/queries/get-gif')

gif.get('/get', (req, res)=>{
  
    getGIf()
    .then(data =>{
        res.json(data.rows)
    })
    .catch(err =>{
        console.log(err);
    })
})


module.exports = gif
