const connection = require('../config/connection.js')


const getInfo = (username) =>{
    return connection.query(`select * from profiles WHERE username = '${username}';`)
}
module.exports = getInfo;

