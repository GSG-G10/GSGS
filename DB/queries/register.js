const connection = require('../config/connection.js')


const createProfile = (username) =>{
    return connection.query(`insert into profiles 
    (username, avatar, background, bio, country, birthday, gender, job, facebook, instagram, hobbies, id_table_follow) 
    values ('${username}', '/defualt/avatar_icon.png', '/defualt/kSv84Nk4u_u.jpg', '', '', '', '', '', '', '', '', '');`)
}

const createTableFollowers = (username) =>{
    return connection.query(`
    CREATE TABLE ${username}_followers(
        id SERIAL PRIMARY KEY,
        follower  VARCHAR(100) NOT NULL);
    `)
}

const createTableFollowing = (username) =>{
    return connection.query(`
    CREATE TABLE ${username}_following(
        id SERIAL PRIMARY KEY,
        following  VARCHAR(100) NOT NULL);
    `)
}


const createTablePosts = (username) =>{
    return connection.query(`
        CREATE TABLE ${username}_posts(
            id SERIAL PRIMARY KEY,
            id_post TEXT NOT NULL,
            date TEXT NOT NULL,
            text_con TEXT NOT NULL,
            img_con TEXT NOT NULL,
            video_con TEXT NOT NULL,
            loves  VARCHAR(20) NOT NULL,
            hates  VARCHAR(20) NOT NULL,
            shares  VARCHAR(20) NOT NULL,
            id_Comments  TEXT NOT NULL
        );
`)
}


const createTableLikes = (username) =>{
    return connection.query(`
CREATE TABLE ${username}_likes(
    id SERIAL PRIMARY KEY,
    id_post TEXT NOT NULL,
    onlike TEXT NOT NULL,
    dislike TEXT NOT NULL);
    
    `)
}


const insertUserNew = (value) =>{
    let datey = new Date()
    let allDate = `${datey.getDate()}-${datey.getMonth()+1}-${datey.getFullYear()}`
  return connection.query(`insert into users (username, email, password, fname, datejoin) 
    values ('${value.username_register}', '${value.email_register}', '${value.password_register}', '${value.fname_register}', '${allDate}');`)
}


const register = async (value) =>{
    await createProfile(value.username_register)
    await createTableFollowers(value.username_register)
    await createTablePosts(value.username_register)
    await createTableFollowing(value.username_register)
    await createTableLikes(value.username_register)
     await insertUserNew(value)
}
module.exports = register;