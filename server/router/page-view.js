const express = require("express");
const path = require("path");
const page = express.Router();
const getInfo = require("../../DB/queries/get-info");
const getPostsProfile = require('../../DB/queries/get-post-profile')
const getName = require("../../DB/queries/get-name");

page.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/page-view/index.html'))
})

page.get('/:page', (req, res)=>{
    // console.log(req.user.username);
    // console.log( req.params.page);
    res.sendFile(path.join(__dirname, '../../public/page-view/index.html'))
})

page.get('/getdata/:page', (req, res)=>{
    getInfo(req.params.page)
    .then(data =>{
        res.json(data.rows[0])
    })
    .catch(err =>{
        console.log(err);
    })
})


page.get('/getfname/:page', (req, res)=>{
    getName(req.params.page)
    .then(data =>{
        res.json(data.rows[0])
    })
    .catch(err =>{
        console.log(err);
    })
})




page.get('/posts/:page/:username', (req, res)=>{

    getPostsProfile(req.params.username, req.params.page)
    .then(data =>{
        console.log(data);
        if(!data){
            console.log(data);
        }else{
            res.json(data)
        }
    })
    .catch(err =>{
        console.log(err);
    })

})

module.exports = page