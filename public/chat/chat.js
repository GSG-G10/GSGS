const socket = window.io()

const inputText = document.querySelector(".textarea_comment");
const content_all_msg = document.querySelector(".content_all_msg");
const btnSendMsg = document.querySelector(".send_comment_to_post");
const broadcast = document.querySelector('.broadcast')
const pop_select_emoji = document.querySelector('.pop_select_emoji')
const get_pop_emoji = document.querySelector('.get_pop_emoji')

let page = 0
let usernameNow = ''
console.log('😼');
console.log('🔥');

content_all_msg.addEventListener('scroll',()=>{
    const {scrollTop, scrollHeight, clientHeight} = content_all_msg
    // console.log({scrollTop, scrollHeight, clientHeight});
    if( scrollTop < 70){

        content_all_msg.scrollTo(0,  700)
        page++
        // console.log(page);
        fetch(`/chat/old-msgs/${page}`)
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
    usernameNow = data
    btnSendMsg.addEventListener('click', ()=>{
        popGif.classList.remove('active')
        pop_select_emoji.classList.remove('active')
    
        if(!inputText.value){
            inputText.classList.add('error')
            setTimeout(()=> {inputText.classList.remove('error')},1000)
        }else{

            socket.emit('getMsg', {
                userSend: data,
                msgContent:  inputText.value
            })
            inputText.style.height = `40px`;
            inputText.value = ''
        }
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
        console.log(data);

        for (let i = data.length - 1; i >= 0; i--) {

            if(data[i].msgcontent.startsWith('gif@http')){

                
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
                               <img src="${data[i].msgcontent.split('@')[1]}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                
        `



            }else{
            
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

    }

    content_all_msg.scrollTo(0, content_all_msg.scrollHeight)

}).catch(console.log)



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



const get_image_gif = document.querySelector('.get_image_gif')
const popGif = document.querySelector('.pop_select_gif_img')


get_image_gif.addEventListener('click', ()=>{

    popGif.classList.toggle('active')
    pop_select_emoji.classList.remove('active')
    console.log('get_image_gif');

    
    fetch(`/gif/get/`)
    .then(data => {
        return data.json()
    })
    .then(data =>{
        console.log(data);


        for (let u = 0; u < data.length; u++) {

            popGif.innerHTML += `
            <img src="${data[u].src}" alt="">
            `

        }

        sendGifSelected()

    }).catch(console.log)

})

function sendGifSelected() {
const gifs = document.querySelectorAll('.pop_select_gif_img img')
    
gifs.forEach(gif=>{
    gif.addEventListener('click', () =>{
        console.log(gif.src);

        socket.emit('addGif', {
            userSend: usernameNow,
            gifSrc: gif.src
        })

    popGif.classList.remove('active')
})
})
}


socket.on('setGif', data=>{
    console.log(data);
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
                   <img src="${data.msgContent.split('@')[1]}" alt="">
                </div>
            </div>
        </div>
    </div>
    
`
content_all_msg.scrollTo(0, content_all_msg.scrollHeight)
})

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








let listEmoji = [
    '&#128512',
    '&#128513',
    '&#128514',
    '&#128515',
    '&#128516',
    '&#128517',
    '&#128518',
    '&#128519',
    '&#128520',
    '&#128521',
    '&#128522',
    '&#128523',
    '&#128524',
    '&#128525',
    '&#128526',
    '&#128527',
    '&#128528',
    '&#128529',
    '&#128530',
    '&#128531',
    '&#128532',
    '&#128533',
    '&#128534',
    '&#128535',
    '&#128536',
    '&#128537',
    '&#128538',
    '&#128539',
    '&#128540',
    '&#128541',
    '&#128542',
    '&#128543',
    '&#128544',
    '&#128545',
    '&#128546',
    '&#128547',
    '&#128548',
    '&#128549',
    '&#128550',
    '&#128551',
    '&#128552',
    '&#128553',
    '&#128554',
    '&#128555',
    '&#128556',
    '&#128557',
    '&#128558',
    '&#128559',
    '&#128560',
    '&#128561',
    '&#128562',
    '&#128563',
    '&#128564',
    '&#128565',
    '&#128566',
    '&#128567',
    '&#128577',
    '&#128578',
    '&#128579',
    '&#128580',
    '&#129296',
    '&#129297',
    '&#129298',
    '&#129299',
    '&#129300',
    '&#129301',
    '&#129312',
    '&#129313',
    '&#129314',
    '&#129315',
    '&#129316',
    '&#129317',
    '&#129319',
    '&#129320',
    '&#129321',
    '&#129322',
    '&#129323',
    '&#129324',
    '&#129325',
    '&#129326',
    '&#129327',
    '&#129488',
    '&#9757',
    '&#9977',
    '&#9994',
    '&#9995',
    '&#9996',
    '&#9997',
    '&#127877',
    '&#127938',
    '&#127939',
    '&#127940',
    '&#127943',
    '&#127946',
    '&#127947',
    '&#127948',
    '&#128066',
    '&#128067',
    '&#128070',
    '&#128071',
    '&#128072',
    '&#128073',
    '&#128074',
    '&#128075',
    '&#128076',
    '&#128077',
    '&#128078',
    '&#128079',
    '&#128080',
    '&#128102',
    '&#128103',
    '&#128104',
    '&#128105',
    '&#128110',
    '&#128112',
    '&#128113',
    '&#128114',
    '&#128115',
    '&#128116',
    '&#128117',
    '&#128118',
    '&#128119',
    '&#128120',
    '&#128124',
    '&#128129',
    '&#128130',
    '&#128131',
    '&#128133',
    '&#128134',
    '&#128135',
    '&#128170',
    '&#128372',
    '&#128373',
    '&#128378',
    '&#128400',
    '&#128405',
    '&#128406',
    '&#128581',
    '&#128582',
    '&#128583',
    '&#128587',
    '&#128588',
    '&#128589',
    '&#128590',
    '&#128591',
    '&#128675',
    '&#128692',
    '&#128693',
    '&#128694',
    '&#128704',
    '&#128716',
    '&#129304',
    '&#129305',
    '&#129306',
    '&#129307',
    '&#129308',
    '&#129309',
    '&#129310',
    '&#129311',
    '&#129318',
    '&#129328',
    '&#129329',
    '&#129330',
    '&#129331',
    '&#129332',
    '&#129333',
    '&#129334',
    '&#129335',
    '&#129336',
    '&#129337',
    '&#129341',
    '&#129342',
    '&#129489',
    '&#129490',
    '&#129491',
    '&#129492',
    '&#129493',
    '&#129494',
    '&#129495',
    '&#129496',
    '&#129497',
    '&#129498',
    '&#129500',
    '&#129501',
]

for (let i = 0; i < listEmoji.length; i++) {
    pop_select_emoji.innerHTML += `
        <p class="bowl_emoji" data-codeSym="${listEmoji[i]}">${listEmoji[i]}</p>
    `
}
const bowl_emoji = document.querySelectorAll('.bowl_emoji')
bowl_emoji.forEach(emoji =>{
    emoji.addEventListener('click', ()=>{
        // console.log(emoji.getAttribute('data-codeSym'));
        inputText.value += emoji.getAttribute('data-codeSym')
    })
})

get_pop_emoji.addEventListener('click', ()=>{
    popGif.classList.remove('active')
    pop_select_emoji.classList.toggle('active')
})



