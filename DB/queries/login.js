const connection = require('../config/connection.js')


    const loginCheckUsername = (value) =>{
        return connection.query(`select * from users where username = '${value.username_login}'`)
    }



    const login = (value) =>{
    //    let username = loginCheckUsername(value)
    //    console.log(username);
        return connection.query(`select * from users where username = '${value}'`)
    }


module.exports = login;