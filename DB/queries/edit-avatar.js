const connection = require('../config/connection.js')

const editInfo = (username, img) =>{
    return connection.query(`UPDATE profiles SET avatar = '${img}' WHERE username = '${username}';`)
}
module.exports = editInfo;