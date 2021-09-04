const express = require("express");
const upload = require("express-fileupload");
const path = require("path");
const posts = express.Router();

const addPost = require("../../DB/queries/add-post");
const getAllPosts = require("../../DB/queries/all-posts");
const getPost = require("../../DB/queries/get-post");


posts.use(upload())

posts.get('/all/:page', async (req, res)=>{

    let idsPosts = await getAllPosts(req.params.page)

    if(idsPosts.rows[0] === undefined){
        console.log(idsPosts.rows[0]);
        res.send(undefined)
        console.log('user not found');
    }
    else{
        let allPostGet = await getPost( idsPosts.rows[0].username, idsPosts.rows[0].id_post)
        console.log('all: ' + Number(allPostGet.countAll));
        console.log(Number(req.params.page));
        if(Number(req.params.page) < Number(allPostGet.countAll)){
            res.json(allPostGet)
        }else{
            console.log('count finsh');
        }
    }

})


posts.post('/new', (req, res)=>{

    let dateSecond =  Date.now()
    let nameRandom = Math.random() * (99999999 - 0) + 0;
    let bigNumber =  dateSecond * nameRandom
    let datey = new Date()
    let allDate = `${datey.getDate()}-${datey.getMonth()+1}-${datey.getFullYear()}`
    
    if(req.files !== null){
        let typeMedia = req.files[Object.keys(req.files)].mimetype.split('/')[0]
        let typeFile = req.files[Object.keys(req.files)].mimetype.split('/')[1]
        let file =  req.files[Object.keys(req.files)]
        let fileNmae = `${bigNumber}.${typeFile}`
        file.mv('/gsgs/storge/'+ typeMedia+ '_posts/' + fileNmae ,(err)=>{
            if(err){
                console.log(err);
            } else {
                let img_con = ``
                let video_con = ``
                if(typeMedia === 'image'){
                     img_con = `/${typeMedia}_posts/${fileNmae}`
                     video_con = ``
                }else{
                    img_con = ``
                    video_con = `/${typeMedia}_posts/${fileNmae}`
                }
                let data = {
                    id_post: (bigNumber / 5),
                    date: allDate,
                    text_con: req.body.text_post,
                    img_con: img_con,
                    video_con: video_con,
                    loves:  `0`,
                    hates:  `0`,
                    shares:  `0`,
                    id_Comments:  (bigNumber / 3)
                }
                addPost(req.user.username, data)
            }
        })
    }else{

        let data = {
            id_post: (bigNumber / 5),
            date: allDate,
            text_con: req.body.text_post,
            img_con: '',
            video_con: '',
            loves:  `0`,
            hates:  `0`,
            shares:  `0`,
            id_Comments:  (bigNumber / 3)
        }
        addPost(req.user.username, data)

    }


    res.redirect('/profile')
})




module.exports = posts