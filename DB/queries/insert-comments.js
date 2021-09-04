const connection = require('../config/connection.js')
const getAvatar = require('./get-avatar')

 

const insertComments = async (query) =>{
    let datey = new Date()
    let allDate = `${datey.getDate()}/${datey.getMonth()+1}/${datey.getFullYear()}`
    let avatar = await getAvatar(query)
    
 return {allDate: allDate, avatar: avatar.rows[0].avatar, username: query}
}


module.exports = insertComments;
