const connection = require('../config/connection.js')


const getPost = (username, id_post) =>{
    return connection.query(`select * from ${username}_posts WHERE id_post = '${id_post}';`)
}
const getInfo = (username) =>{
    return connection.query(`select * from users WHERE username = '${username}';`)
}
const getProfile = (username) =>{
    return connection.query(`select * from profiles WHERE username = '${username}';`)
}


const countPostUser = () =>{
    return connection.query(`SELECT count(*) FROM all_users_posts;`)
}

const getReactLikes = (username, id_post) =>{
    return connection.query(`select * from ${username}_likes where id_post = '${id_post}';`)
}




const getAllData = async (username, id_post) =>{
    let countTest =  await countPostUser()
    let count = await countTest.rows[0].count

        let postDB =  await getPost(username, id_post)
        let infoDB =  await getInfo(username)
        let profileDB =  await getProfile(username)
        let stateReactLikes =  await getReactLikes(username, id_post)

    let objectAll = {...postDB.rows[0], ...infoDB.rows[0], ...profileDB.rows[0], countAll: count, ...stateReactLikes.rows[0]}
    return  objectAll
}


module.exports = getAllData;

