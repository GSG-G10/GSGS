const socket = window.io()

const inputText = document.querySelector(".textarea_comment");
const content_all_msg = document.querySelector(".content_all_msg");
const btnSendMsg = document.querySelector(".send_comment_to_post");
const broadcast = document.querySelector('.broadcast')

let page = 0

content_all_msg.addEventListener('scroll',()=>{
    const {scrollTop, scrollHeight, clientHeight} = content_all_msg
    // console.log({scrollTop, scrollHeight, clientHeight});
    if( scrollTop < 70){

        content_all_msg.scrollTo(0,  700)
        page++
        console.log(page);
        fetch(`/chat/old-msgs/${page}`)
        .then(data => {
            return data.json()
        })
        .then(data =>{
            console.log(data);
        
            for (let i = data.length - 1; i >= 0; i--) {
        
                let textTag = ``
                let msgText = data[i].msgcontent.split('\n')
                for (let m = 0; m < msgText.length; m++) {
                    textTag += `<span>${msgText[m]}</span> </br>`
                }

                
                let content = `
                    <div class="user_send">
                        <div class="avatar_user_ch">
                            <a href="/page/${data[i].username}">
                                <img src="${data[i].avatar}" alt="">
                            </a>
                        </div>
                        <div class="username_ch">
                            <a href="/page/${data[i].username}">@${data[i].username}</a>
                                <span class="timeMsg ">${data[i].datesend}</span>
                                <span class="timeMsg ">${data[i].timesend} ${data[i].stateday}</span>
                            <div class="content_msg">
                               ${textTag}
                            </div>
                        </div>
                    </div>
                
        `
        let divFath = document.createElement('div')
                divFath.classList.add('line_msg')
                divFath.innerHTML = content
                content_all_msg.insertBefore(divFath, content_all_msg.firstChild);
            }
        
        }).catch(console.log)
        
    }
})



fetch(`/chat/get-user/`)
.then(data => {
    return data.json()
})
.then(data =>{

    btnSendMsg.addEventListener('click', ()=>{
        socket.emit('getMsg', {
            userSend: data,
            msgContent:  inputText.value
        })
        inputText.style.height = `40px`;
        inputText.value = ''
    })
    



    inputText.addEventListener('input', ()=>{
        socket.emit('broad', {
            user:  data
        })


    })
    






    
}).catch(console.log)



fetch(`/chat/old-msgs/0`)
    .then(data => {
        return data.json()
    })
    .then(data =>{
        // console.log(data);

        for (let i = data.length - 1; i >= 0; i--) {

            let textTag = ``
            let msgText = data[i].msgcontent.split('\n')
            for (let m = 0; m < msgText.length; m++) {
                textTag += `<span>${msgText[m]}</span> </br>`
            }
            content_all_msg.innerHTML +=`
            <div class="line_msg">
                <div class="user_send">
                    <div class="avatar_user_ch">
                        <a href="/page/${data[i].username}">
                            <img src="${data[i].avatar}" alt="">
                        </a>
                    </div>
                    <div class="username_ch">
                        <a href="/page/${data[i].username}">@${data[i].username}</a>
                            <span class="timeMsg ">${data[i].datesend}</span>
                            <span class="timeMsg ">${data[i].timesend} ${data[i].stateday}</span>
                        <div class="content_msg">
                            ${textTag}
                        </div>
                    </div>
                </div>
            </div>
            
    `
        }


    let scrHi = content_all_msg.scrollHeight
    content_all_msg.scrollTo(0, scrHi)


}).catch(console.log)





socket.on('setMsg', data=>{
    console.log(data);

    let textTag = ``
    let msgText = data.msgContent.split('\n')
    for (let m = 0; m < msgText.length; m++) {
        textTag += `<span>${msgText[m]}</span> </br>`
    }

    content_all_msg.innerHTML +=`
        <div class="line_msg">
            <div class="user_send">
                <div class="avatar_user_ch">
                    <a href="/page/${data.userSend}">
                        <img src="${data.avatar}" alt="">
                    </a>
                </div>
                <div class="username_ch">
                    <a href="/page/${data.userSend}">@${data.userSend}</a>
                        <span class="timeMsg ">${data.date}</span>
                        <span class="timeMsg ">${data.time} ${data.stateDay}</span>
                    <div class="content_msg">
                        ${textTag}
                    </div>
                </div>
            </div>
        </div>

    `
    content_all_msg.scrollTo(0, content_all_msg.scrollHeight )

})







inputText.addEventListener("input", ()=>{
let str = inputText.value
let lines = (str.match(/\n/g) || '' || str.length >=49).length + 1
inputText.style.height = `0px`;
inputText.style.height = `${lines * 22 + 22}px`;
});




    

socket.on('goboard', userWriten=>{
    broadcast.classList.add('active')
console.log(userWriten);
if(userWriten){
    broadcast.innerHTML =  `
    <div class="cast_user" data-user="${userWriten.userWriten.user}">
        <div class="user_is_write">
            <span>@${userWriten.userWriten.user}</span>
        </div>
        <div class="point_cast" style="--i:1;"></div>
        <div class="point_cast" style="--i:2;"></div>
        <div class="point_cast" style="--i:3;"></div>
    </div>
    `
}else{
    // removeChild(broadcast)
}


    setTimeout(()=>{
        broadcast.classList.remove('active')
        removeChild(broadcast)
    },2000)
})

// for remove all content main
function removeChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}