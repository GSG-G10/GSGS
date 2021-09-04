const connection = require('../config/connection.js')

const setMsg = (newData) =>{
    return connection.query(`insert into chat (username, dateSend, timeSend, stateDay, msgContent) values ('${newData.userSend}', '${newData.date}', '${newData.time}', '${newData.stateDay}', '${newData.msgContent}');`)
}

module.exports = setMsg;

