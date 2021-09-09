const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const server = require("http").createServer(app)
const io = require("socket.io")(server)
require("env2")("config.env");

const dbLogin = require('../DB/queries/login')

const land = require('./router/land')
const login = require('./router/login')
const register = require('./router/register')
const logout = require('./router/logout')
const home = require('./router/home')
const profile = require('./router/profile')
const edit = require('./router/edit')
const pageView = require('./router/page-view')
const follow = require('./router/follow')
const posts = require('./router/posts')
const chat = require('./router/chat')
const random = require('./router/random')
const likes = require('./router/likes')
const comments = require('./router/comments')
const seeting = require('./router/setting-post')
const gifRoute = require('./router/gif')

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 3000);

app.use('/chat', authToken,  chat)
app.use('/random', authToken,  random)
app.use('/posts', authToken,  posts)
app.use('/page', authToken,  pageView)
app.use('/follow', authToken,  follow)
app.use('/',  land)
app.use('/login',  login)
app.use('/register',  register)
app.use('/home', authToken,  home)
app.use('/logout', authToken,  logout)
app.use('/edit', authToken,  edit)
app.use('/profile', authToken,  profile)
app.use('/likes', authToken,  likes)
app.use('/comments', authToken,  comments)
app.use('/setting', authToken,  seeting)
app.use('/gif', authToken,  gifRoute)

app.use(express.static(path.join(__dirname, "..", "storge")));
app.use(express.static(path.join(__dirname, "..", "public"), { maxAge: "30d" }));
app.use(express.static(path.join(__dirname, "..", "DB"), { maxAge: "30d" }));





 function authToken(req, res, next){
    let token = req.cookies['token']
    if(token == null) {
        console.log("token user error");
        res.redirect('/')
        return;
    }


    jwt.verify(token, process.env.SECRET,async (err, user)=>{
        if(err) {
            console.log(err);
            res.redirect('/');
        }
        req.user = user
        req.token = token
        let data = await dbLogin(req.user.username)
        if(req.user.password === data.rows[0].password){
            next()
        }else{
            console.log("data is error");
            // res.redirect('/');
        }
    })
}




module.exports = {server, app};
