const connection = require('../config/connection.js')

const getGif = () =>{

    return connection.query(`select * from gif ORDER BY RANDOM() LIMIT 6;`)

}
module.exports = getGif;