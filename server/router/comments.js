

const express = require("express");
const comments = express.Router();
const addComments = require('../../DB/queries/add-comments')
const getComments = require('../../DB/queries/get-comments')
const insertComments = require('../../DB/queries/insert-comments')

comments.post('/add', (req, res)=>{
    let datey = new Date()
    let allDate = `${datey.getDate()}/${datey.getMonth()+1}/${datey.getFullYear()}`
    addComments({...req.body, allDate, userFrom: req.user.username})
    .then(data =>{
        res.json({...data, username: req.user.username})
    })
    .catch(err =>{
        console.log(err);
    })
})




comments.get('/get/:id_comments', (req, res)=>{
    getComments(req.params.id_comments)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        console.log(err);
    })
})


comments.get('/insert/', (req, res)=>{
    insertComments(req.user.username)
    .then(data=>{
        res.json(data)
    }).catch(console.log)
})





module.exports = comments
