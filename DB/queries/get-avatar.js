const connection = require('../config/connection.js')

const getAvatar = (username) =>{
    return connection.query(`select avatar from profiles WHERE username = '${username}';`)
}
module.exports = getAvatar;
