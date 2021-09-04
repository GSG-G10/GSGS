const express = require("express");
const follow = express.Router();
const  io  = require("../index");


const setFollow = require('../../DB/queries/set-follow')
const checkFollow = require('../../DB/queries/check-follow')
const countFollow = require('../../DB/queries/count-follow')


follow.post('/:foto', (req, res)=>{
    setFollow(req.user.username, req.params.foto)
    .then(data =>{
        res.redirect(`/page/${req.params.foto}`)
    })
    .catch(err =>{
        console.log(err);
    })

})





follow.get('/:foto', (req, res)=>{
    checkFollow(req.user.username, req.params.foto)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        console.log(err);
    })
})









follow.get('/count/:foto', (req, res)=>{
    
    countFollow(req.params.foto)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        console.log(err);
    })

})


module.exports = follow