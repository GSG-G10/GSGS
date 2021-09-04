const express = require("express");
const setting = express.Router();

const setDeletePost = require("../../DB/queries/delete-post");
const setWEditPost = require("../../DB/queries/edit-post");

setting.get('/delete/:id_post', (req, res)=>{
    setDeletePost(req.user.username, req.params.id_post)
    .then(check=>{
        if(check.command=== 'DELETE'){
            res.json({notifi: "deleted post"})
        }
    })

})

setting.post('/edit/', async (req, res)=>{

    let sending = await setWEditPost(req.user.username, req.body.id_post, req.body.text)
 
    if(sending.command === 'UPDATE'){
        res.json({notifi:"edit success"})
    }else{
        res.redirect('/profile')
    }

})





module.exports = setting