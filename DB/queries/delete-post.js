
const connection = require('../config/connection.js')



const deletePost = (username, id_post) =>{
    return connection.query(`DELETE FROM ${username}_posts WHERE id_post = '${id_post}';`)
}


module.exports = deletePost;
