const connection = require('../config/connection.js')

const editInfo = (username, img) =>{
    return connection.query(`UPDATE profiles SET background = '${img}' WHERE username = '${username}';`)
}
module.exports = editInfo;