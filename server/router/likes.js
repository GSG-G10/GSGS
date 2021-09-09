const express = require("express");
const likes = express.Router();
const setLikes = require('../../DB/queries/set-likes')

likes.get('/:kind/:username/:id_post/:state', (req, res)=>{
  
    let query = {
        kind: req.params.kind,
        username_post: req.params.username,
        id_post: req.params.id_post,
        state: req.params.state,
        username_do: req.user.username
    }
    setLikes(query)
    .then(data =>{
        // console.log(data);
        res.json(data)
    })
    .catch(err =>{
        console.log(err);
    })

})


module.exports = likes
