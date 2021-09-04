const express = require("express");
const upload = require("express-fileupload");
const path = require("path");
const edit = express.Router();

const editInfo = require("../../DB/queries/edit-info");
const getInfo = require("../../DB/queries/get-info");
const getName = require("../../DB/queries/get-name");
const editAvatar = require("../../DB/queries/edit-avatar");
const editBackground = require("../../DB/queries/edit-background");
const app = require("../app");
edit.use(upload())


edit.get('/getinfo', (req, res)=>{
    getInfo(req.user.username)
    .then(data =>{
        res.json(data.rows[0])
    })
    .catch(err =>{
        console.log(err);
    })

})
edit.get('/fname', (req, res)=>{
    getName(req.user.username)
    .then(data =>{
        res.json(data.rows[0])
    })
    .catch(err =>{
        console.log(err);
    })

})


edit.post('/info', (req, res)=>{
    editInfo(req.user.username, req.body)
    .then(result =>{
        console.log('info saved');
        res.redirect('/')
    })
    .catch(err =>{
        console.log(err);
    })
})


// upload
edit.post('/avatar', (req, res)=>{
    if(req.files){
        let file =  req.files.avatar
        let filmimetype = req.files.avatar.mimetype
        let typeFile = filmimetype.split('/')[1]
        let dateSecond =  Date.now()
        let nameRandom = Math.random() * (99999999 - 0) + 0;
        let bigNumber =  dateSecond * nameRandom
        let fileNmae = `${bigNumber}.${typeFile}`
        file.mv('./storge/avatars/' + fileNmae ,(err)=>{
            if(err){
                console.log(err);
            } else {
                editAvatar(req.user.username, `/avatars/${fileNmae}`)
            }
        })
    res.redirect('/edit')
    }
})



edit.post('/background', (req, res)=>{
    if(req.files){
        let file =  req.files.background
        let filmimetype = req.files.background.mimetype
        let typeFile = filmimetype.split('/')[1]
        let dateSecond =  Date.now()
        let nameRandom = Math.random() * (99999999 - 0) + 0;
        let bigNumber =  dateSecond * nameRandom
        let fileNmae = `${bigNumber}.${typeFile}`
        file.mv('./storge/backgrounds/' + fileNmae ,(err)=>{
            if(err){
                console.log(err);
            } else {
                editBackground(req.user.username, `/backgrounds/${fileNmae}`)
                console.log(`/backgrounds/${fileNmae}`);
                console.log("upload done");
            }
        })
    res.redirect('/edit')
    }
})





module.exports = edit