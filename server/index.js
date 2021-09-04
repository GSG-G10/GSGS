const {server} = require("./app.js");
const socket = require("socket.io");
const setChatMsg = require("../DB/queries/set-chat-msg");
const getAvatar = require("../DB/queries/get-avatar");


let serverSocket = server.listen(3000, () => {
  console.log(`App running http://localhost:3000`);
});



let sio = socket(serverSocket)
sio.on('connection', (visitor) => {

  visitor.on('broad', userWriten=>{
    visitor.local.emit('goboard', {userWriten})
  })


    visitor.on('getMsg', data=>{

        let datey = new Date()
        let allDate = `${datey.getDate()}/${datey.getMonth()+1}/${datey.getFullYear()}`
        let allTime = `${datey.getHours()}:${datey.getMinutes()+1}`
        let stateDay = ''
        if(datey.getHours() >= 0 && datey.getHours() <= 12){
          stateDay = 'am'
        }else{
          stateDay = 'pm'
        }

        let newData = {
          date: allDate,
          time: allTime,
          stateDay: stateDay,
          userSend: data.userSend,
          msgContent: data.msgContent,
        }
        
        setChatMsg(newData)
        getAvatar(newData.userSend)
        .then(data =>{

          sio.sockets.emit('setMsg', {...newData, ...data.rows[0]})
          
        }).catch(console.log)

    })



        
 


})




