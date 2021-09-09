const connection = require('../config/connection.js')
const getAvatar = require('./get-avatar')

const getInfoComments = (id_comments) =>{
    return connection.query(`select * from comments_${id_comments} ORDER BY RANDOM() LIMIT 3;`)
}

const getInfo = async (id_comments) =>{
    let users = await getInfoComments(id_comments)
    let fullUsers = []
    for (let i = 0; i < users.rows.length; i++) {
        let avatar = await getAvatar(users.rows[i].username)
        fullUsers.push({...users.rows[i],...avatar.rows[0]})
    }
    return fullUsers
}

module.exports = getInfo;

