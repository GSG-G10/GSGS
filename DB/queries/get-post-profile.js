const connection = require('../config/connection.js')


const countPostUser = (username) =>{
return connection.query(`SELECT count(*) FROM ${username}_posts;`)
}

const getPost = (username, page) =>{
    return connection.query(`select * from ${username}_posts OFFSET ${page} LIMIT 1;`)
}
const getInfo = (username) =>{
    return connection.query(`select * from users WHERE username = '${username}';`)
}
const getProfile = (username) =>{
    return connection.query(`select * from profiles WHERE username = '${username}';`)
}
const getReactLikes = (username, id_post) =>{
    return connection.query(`select * from ${username}_likes where id_post = '${id_post}';`)
}

const getPostsProfile = async (username, page) =>{

let countTest =  await countPostUser(username)
let count = await countTest.rows[0].count
console.log(Number(count) );
console.log(Number(page) );
    if(Number(page) < Number(count)){
        let postDB =  await getPost(username, page)
        let infoDB =  await getInfo(username)
        let profileDB =  await getProfile(username)
        let stateReactLikes =  await getReactLikes(username, postDB.rows[0].id_post)
        let objectAll = {...postDB.rows[0], ...infoDB.rows[0], ...profileDB.rows[0], countAll: count, ...stateReactLikes.rows[0]}
        return  objectAll
    }else{
        return false
    }
}

module.exports = getPostsProfile;

