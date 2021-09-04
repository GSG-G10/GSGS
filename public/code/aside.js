const cards_tops = document.querySelector('.cards_tops')
const auto_freind_follow = document.querySelector('.auto_freind_follow')



for (let i = 0; i < 7; i++) {
    cards_tops.innerHTML += `
               
<div class="card_hasgtag_top" style="--i:${i};">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32"  xml:space="preserve"> <g> <g id="hash"> <path d="M30,12V8h-5.004l1-8h-4l-1,8h-7.998l1-8h-4l-1,8H2v4h6.498L7.5,20H2v4h5l-1,8h4l1-8h8l-1.002,8H22 l1-8h7v-4h-6.5l0.996-8H30z M19.5,20h-8l0.998-8h7.998L19.5,20z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
    <span class="name_hashtag">Anime</span>
    <span class="count_posts">25K</span>
</div>

    `
}



fetch(`/random/users`)
.then(data => {
    return data.json()
})
.then(data =>{
    // console.log(data);


for (let i = 0; i < data.length; i++) {
    auto_freind_follow.innerHTML += `
<div class="card_friend_follow" style="--i:${i};">
    <div class="avatar_user">
        <a href="/page/${data[i].username}">
            <img src="${data[i].avatar}" alt="">
        </a>
    </div>
    <div class="info_user">
        <a href="/page/${data[i].username}" class="a_info_user">
            <span class="fullname_user">${data[i].fname}</span>
            <span class="username_user">@${data[i].username}</span>
        </a>
    </div>
</div>
    `
}


// <div class="btn_add_follow">
// <button>Follow</button>
// </div>



}).catch(console.log)

















