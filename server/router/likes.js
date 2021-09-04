const express = require("express");
const likes = express.Router();
const setLikes = require('../../DB/queries/set-likes')


likes.get('/:kind/:username/:id_post/:state', (req, res)=>{
  
    console.log(req.params);
    setLikes(req.params)
    .then(data =>{
        // console.log(data);
        res.json(data)
    })
    .catch(err =>{
        console.log(err);
    })

})


module.exports = likes
