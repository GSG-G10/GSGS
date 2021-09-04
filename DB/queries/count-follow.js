const connection = require('../config/connection.js')


const countFollowing = (username) =>{
    return connection.query(`SELECT count(*) FROM ${username}_following;`)
}

const countFollowers = (username) =>{
    return connection.query(`SELECT count(*) FROM ${username}_followers;`)
}

const setFollow = async (username) =>{
    let cFollowing = await countFollowing(username)
    let cFollowers =  await countFollowers(username)

    let counts = {
        cFollowing: cFollowing.rows[0].count,
        cFollowers: cFollowers.rows[0].count
    }
    return counts
}


module.exports = setFollow;

