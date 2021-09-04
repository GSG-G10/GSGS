const connection = require('../config/connection.js')

const getMsgALl = (page) =>{
    if(page ===0){
        return connection.query(`SELECT * FROM chat ORDER  BY ctid DESC  OFFSET ${page} LIMIT 15;`)
    }else{
        page = page * 15
        return connection.query(`SELECT * FROM chat ORDER  BY ctid DESC  OFFSET ${page} LIMIT 15;`)
    }
}
const getMsgUserAVatar = (username) =>{
    return connection.query(`SELECT avatar FROM profiles where username = '${username}';`)
}

const getMsg = async (page) =>{

    let msgs = await getMsgALl(page)
    let objectAll = []
    for (let i = 0; i < msgs.rows.length; i++) {
        let avatar = await getMsgUserAVatar( msgs.rows[i].username)
        let newRow = { ...msgs.rows[i], ...avatar.rows[0]}
        objectAll.push(newRow)
    }
    return objectAll

}

module.exports = getMsg;
