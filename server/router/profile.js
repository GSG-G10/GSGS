const express = require("express");
const path = require("path");
const profile = express.Router();
const countFollow = require('../../DB/queries/count-follow')
const getPostsProfile = require('../../DB/queries/get-post-profile')

profile.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/profile/index.html'))
})

profile.get('/count/', (req, res)=>{
    countFollow(req.user.username)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        console.log(err);
    })
})


profile.get('/posts/:page', (req, res)=>{
    console.log('get posts for-- : '+ req.user.username);
    console.log('page : '+ req.params.page);
    getPostsProfile(req.user.username, req.params.page)
    .then(data =>{
        if(Number(req.params.page) <= Number(data.countAll)){
        res.json(data)
        }else{
           console.log({msg: "no posts more x sory"})
           res.json({moreLoad: false})
        }
    })
    .catch(err =>{
        console.log(err);
    })

})


module.exports = profile