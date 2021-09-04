const connection = require('../config/connection.js')

const editInfo = (username, info) =>{
    return connection.query(`UPDATE profiles SET bio = '${info.bio}', country = '${info.country}',
    birthday = '${info.birthday}',
    gender = '${info.gender}',
    job = '${info.job}',
    facebook = '${info.facebook}',
    instagram = '${info.instagram}',
    hobbies = '${info.hobbies}' WHERE username = '${username}';`)
}
module.exports = editInfo;