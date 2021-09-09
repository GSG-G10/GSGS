const connection = require('../config/connection.js')
const addGif = (src) =>{
    return connection.query(`insert into gif (src, category, prpo)
     values ('${src}', '', '');`)
}
module.exports = addGif;