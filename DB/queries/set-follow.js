const connection = require('../config/connection.js')


const setFollowAddFrom = (username, foto) =>{
    return connection.query(`insert into ${foto}_followers (follower) values ('${username}');`)
}

const setFollowAddTo = (username, foto) =>{
    return connection.query(`insert into ${username}_following (following) values ('${foto}');`)
}


const checkUserFollowTo = (username, foto) =>{
    return connection.query(`select * from ${foto}_followers where follower = '${username}';`)
}

const checkUserFollowFrom = (username, foto) =>{
    return connection.query(`select * from ${username}_following where following = '${foto}';`)
}


const deleteUserFollowTo = (username, foto) =>{
    return connection.query(`DELETE from ${foto}_followers where follower = '${username}';`)
}


const deleteUserFollowFrom = (username, foto) =>{
    return connection.query(`DELETE from ${username}_following where following = '${foto}';`)
}

const setFollow =async (username, foto) =>{

    let checkUserFollower =await checkUserFollowTo(username, foto)
    let checkUserFollowing =await checkUserFollowFrom(username, foto)
    if(checkUserFollower.rows[0]){
        deleteUserFollowTo(username, foto)
    }else{
        setFollowAddFrom(username, foto)
    }
    
    if(checkUserFollower.rows[0]){
        deleteUserFollowFrom(username, foto)
    }else{
        setFollowAddTo(username, foto)
    }

}



module.exports = setFollow;

