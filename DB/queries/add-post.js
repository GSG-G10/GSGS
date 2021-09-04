const connection = require('../config/connection.js')


const addPostUserNew = (username, data) =>{
    return connection.query(`insert into ${username}_posts (id_post, date, text_con, img_con, video_con, loves, hates, shares, id_Comments) 
             values ('${data.id_post}', '${data.date}', '${data.text_con}', '${data.img_con}', '${data.video_con}', '${data.loves}',
              '${data.hates}', '${data.shares}', '${data.id_Comments}');`)
}

const insertThisPostToAll = (username, data) =>{
    return connection.query(`insert into all_users_posts (username, id_post) values ('${username}', '${data.id_post}');`)
}

const createTableCommintsThisPost = (id_Comments) =>{
    return connection.query(`
    CREATE TABLE comments_${id_Comments}(
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        date TEXT NOT NULL,
        text  TEXT NOT NULL
    );
    `)
}


const addPost = async (username, data) =>{
await  addPostUserNew(username, data)
 await  insertThisPostToAll(username, data)
 await  createTableCommintsThisPost(data.id_Comments)

//  console.log(test1.rows , test2.rows[0], test3.rows[0]);
}



module.exports = addPost;