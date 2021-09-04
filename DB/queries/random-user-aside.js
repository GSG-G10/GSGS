
const connection = require('../config/connection.js')
const getAvatar = require('./get-avatar')

const getUsers = () =>{
    return connection.query(`SELECT * FROM users ORDER BY RANDOM() LIMIT 6;`)
}

const getUsersRandomAside = async () =>{
    let users = await getUsers()
    let fullUsers = []
    for (let i = 0; i < users.rows.length; i++) {
        let avatar = await getAvatar(users.rows[i].username)
        fullUsers.push({...users.rows[i],...avatar.rows[0]})
    }

    return fullUsers
}
module.exports = getUsersRandomAside;
