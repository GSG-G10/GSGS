const connection = require('../config/connection.js')


const getInfo = () =>{
    return connection.query(`select * from profiles;`)
}
module.exports = getInfo;

