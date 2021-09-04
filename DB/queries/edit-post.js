
const connection = require('../config/connection.js')



const editPOstText = (username, id_post, textNew) =>{
    return  connection.query(`UPDATE ${username}_posts SET text_con = '${textNew}' WHERE id_post= '${id_post}';`)
 
}

module.exports = editPOstText;
