const connection = require('../config/connection.js')


const getAllPosts = (page) =>{
        return connection.query(`select * from all_users_posts OFFSET ${page} LIMIT 1;`);
}

module.exports = getAllPosts;
