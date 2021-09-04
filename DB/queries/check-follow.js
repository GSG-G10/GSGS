const connection = require('../config/connection.js')


const checkUserFollowFrom = (username, foto) =>{
    return connection.query(`select * from ${username}_following where following = '${foto}';`)
}

const checkFollow =async (username, foto) =>{
    let checkUserFollowing =await checkUserFollowFrom(username, foto)
    if(checkUserFollowing.rows[0]){
        return true
    }else{
       return false
    }

}



module.exports = checkFollow;

