const connection = require('../config/connection.js')


const getName = (username) =>{
    return connection.query(`select fname from users WHERE username = '${username}';`)
}
module.exports = getName;

