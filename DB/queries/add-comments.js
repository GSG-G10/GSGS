const connection = require('../config/connection.js')

const addComments = async (query) =>{
   await  connection.query(`insert into comments_${query.idCommets} (username, date, text) 
    values ('${query.userFrom}', '${query.allDate}', '${query.text_comment}');`)
    return {id_Comments: query.idCommets}
}

module.exports = addComments;
