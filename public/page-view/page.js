

let userPageView = (location.pathname).split('/')[2]
console.log(userPageView);

const btn_follow = document.querySelector('.btn_follow')
const avatar_user = document.querySelector('.avatar_user img')
const back_img_profile = document.querySelector('.back_img_profile img')
const bio_user = document.querySelector('.bio_user')
const select_option_country = document.querySelector('.select_option_country')
const birthday_date = document.querySelector('.birthday_date')
const the_gender = document.querySelector('.the_gender')
const job = document.querySelector('.job')
const facebook = document.querySelector('.facebook')
const instagram = document.querySelector('.instagram')
const hobbies = document.querySelector('.hobbies')
const fullname_user_prof = document.querySelector('.fullname_user_prof')
const username = document.querySelector('.username')
const svg_gay = document.querySelector('.svg_gay')
const svg_male = document.querySelector('.svg_male')
const svg_female = document.querySelector('.svg_female')
const count_following = document.querySelector('.count_following')
const count_followers = document.querySelector('.count_followers')
const content_main = document.querySelector('.content_main')






fetch(`/page/getdata/${userPageView}`)
.then(data => {
    return data.json()
})
.then(data =>{
    avatar_user.src = data.avatar
    back_img_profile.src = data.background
    bio_user.textContent = data.bio
     select_option_country.textContent = data.country
     birthday_date.textContent = data.birthday

     if(data.gender == 'male'){
        svg_male.classList.add('active')
    }
    if(data.gender == 'gay'){
        svg_gay.classList.add('active')
    }
    if(data.gender == 'female'){
        svg_female.classList.add('active')
    }

     the_gender.textContent = data.gender
     job.textContent = data.job
     facebook.textContent = data.facebook
     instagram.textContent = data.instagram
     hobbies.textContent = data.hobbies
     username.textContent = `@${data.username}`
    // console.log(data);
})
.catch(console.log)


fetch(`/page/getfname/${userPageView}`)
.then(data => {
    return data.json()
})
.then(data =>{
    // console.log(data);
    fullname_user_prof.textContent = data.fname
})
.catch(console.log)




//userPageView
//check user follow him
fetch(`/follow/${userPageView}`)
.then(data => {
    return data.json()
})
.then(data =>{
    if(data){
        btn_follow.classList.add('active')
    }else{
        btn_follow.classList.remove('active')
    }
})
.catch(console.log)


//count followers, following
fetch(`/follow/count/${userPageView}`)
.then(data => {
    return data.json()
})
.then(data =>{
    count_following.textContent = `following ${data.cFollowing}`
    count_followers.textContent = `follower ${data.cFollowers}`
})
.catch(console.log)



// add follow
btn_follow.addEventListener('click', ()=>{
    
// 
    // const socket = window.io()
    // socket.emit('follow', { msgNav: `from ${userPageView} home`, userAdd : userPageView})


    fetch(`/follow/${userPageView}`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
    .then((response) => {
        response.json()
        console.log(response);
        location.assign(`/page/${userPageView}`)
    })
    .catch((err) => console.log(err));
})







//count followers, following
fetch(`/profile/count/`)
.then(data => {
    return data.json()
})
.then(data =>{
    count_following.textContent = `following ${data.cFollowing}`
    count_followers.textContent = `follower ${data.cFollowers}`
})
.catch(console.log)








// get posts -------------------
const side_prof_posts_user =document.querySelector('.side_prof_posts_user')
let moreLoad = true
let page = 0
console.log(page);
callPostsProfile(page)
page++
callPostsProfile(page)

window.addEventListener('scroll',()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if((clientHeight + scrollTop >= scrollHeight - 20 && moreLoad === true)){
        window.scrollTo({
            top: scrollHeight - 200,
            behavior: 'smooth'
          });
        page++
        callPostsProfile(page)
    }
})


function callPostsProfile(page){
        fetch(`/profile/posts/${page}`)
        .then(data => {
            return data.json()
        })
        .then(data =>{

            if(data.moreLoad === false){
                moreLoad = false
            } else {

                let content = ``
                if(data.video_con){
                    content = `
                        <div class="content_text_post">
                            <span>${data.text_con}</span>
                        </div> 
                        <div class="content_video_Post">
                            <video src="${data.video_con}" controls controlsList="nodownload"></video>
                        </div>
                    `
                }else if(data.img_con){
                    content = `
                    <div class="content_text_post">
                        <span>${data.text_con}</span>
                    </div> 
                    <div class="content_image_post">
                        <img src="${data.img_con}" alt="">
                    </div>
                    `
                }else{
                    content = `
                    <div class="content_text_post big_text">
                        <span>${data.text_con}</span>
                    </div> 
                    `
                }
    
                let setStateLike = ``
                let setStateDislike = ``
    
                if(data.onlike === 'true'){
                    setStateLike = `
                        <div class="icon_React icon_React_like" data-like="true" data-username="${data.username}" data-id_post="${data.id_post}">
                            <svg class="liked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z" class="style-scope yt-icon"></path></g></svg>
                        </div>
                `
                }else{
                    setStateLike = `
                    <div class="icon_React icon_React_like" data-like="false" data-username="${data.username}" data-id_post="${data.id_post}">
                        <svg class="noliked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" class="style-scope yt-icon"></path></g></svg>
                    </div>
                `
                }
    
    
                if(data.dislike === 'true'){
                    setStateDislike = `
                        <div class="icon_React icon_React_dislike" data-dislike="true" data-username="${data.username}" data-id_post="${data.id_post}">
                        <svg class="disliked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M18,4h3v10h-3V4z M5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21c0.58,0,1.14-0.24,1.52-0.65L17,14V4H6.57 C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14z" class="style-scope yt-icon"></path></g></svg>
                        </div>
                `
                }else{
                    setStateDislike = `
                    <div class="icon_React icon_React_dislike" data-dislike="false" data-username="${data.username}" data-id_post="${data.id_post}">
                        <svg class="nodisliked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z" class="style-scope yt-icon"></path></g></svg>
                    </div>
                `
                }
    
    
                content_main.innerHTML += 
                `
                <div class="bowl_post">
                <!--  -->
                <div class="head_post">
                    <div class="avatar_user_post">
                        <a href="/page/${data.username}">
                            <img src="${data.avatar}" alt="">
                        </a>
                    </div>
                    <div class="info_user_post">
                        <a href="/page/${data.username}" class="fullname_user_post">${data.fname}</a>
                        <a href="/page/${data.username}" class="username_pot">@${data.username}</a>
                        <a href="/page/${data.username}" class="date_post">${data.date}</a>
                    </div>
                </div>
    
                <!--  -->
                <div class="content_post">
                    ${content}
                </div>
    
                <div class="content_old_${data.id_comments} insert_${data.id_comments}">
        
                </div>
    
                <!--  -->
                <div class="add_comment_to_post" data-id_commets="${data.id_comments}">
                    <div class="input_write_comment">
                        <textarea class="textarea_comment" placeholder="Aa.." name="" id="" ></textarea>
                        <div class="tool_for_comment">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 368 368" style="enable-background:new 0 0 368 368;" xml:space="preserve"> <g> <g> <g> <path d="M261.336,226.04c-3.296-2.952-8.36-2.664-11.296,0.624C233.352,245.312,209.288,256,184,256 c-25.28,0-49.352-10.688-66.04-29.336c-2.952-3.288-8-3.576-11.296-0.624c-3.296,2.944-3.568,8-0.624,11.296 C125.76,259.368,154.176,272,184,272c29.832,0,58.248-12.64,77.96-34.664C264.904,234.04,264.624,228.984,261.336,226.04z"/> <path d="M184,0C82.544,0,0,82.544,0,184s82.544,184,184,184s184-82.544,184-184S285.456,0,184,0z M184,352 c-92.64,0-168-75.36-168-168S91.36,16,184,16s168,75.36,168,168S276.64,352,184,352z"/> <path d="M248,128c-22.056,0-40,17.944-40,40c0,4.416,3.584,8,8,8c4.416,0,8-3.584,8-8c0-13.232,10.768-24,24-24s24,10.768,24,24 c0,4.416,3.584,8,8,8c4.416,0,8-3.584,8-8C288,145.944,270.056,128,248,128z"/> <path d="M144,168c0,4.416,3.584,8,8,8s8-3.584,8-8c0-22.056-17.944-40-40-40c-22.056,0-40,17.944-40,40c0,4.416,3.584,8,8,8 s8-3.584,8-8c0-13.232,10.768-24,24-24S144,154.768,144,168z"/> </g> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <g> <path d="M146.286,146.286H36.571C14.629,146.286,0,164.571,0,182.857v146.286c0,18.286,14.629,36.571,36.571,36.571h109.714 c21.943,0,36.571-18.286,36.571-36.571V256H128v54.857H54.857V201.143h128v-18.286 C182.857,164.571,168.229,146.286,146.286,146.286z"/> <polygon points="512,201.143 512,146.286 347.429,146.286 347.429,365.714 402.286,365.714 402.286,292.571 475.429,292.571 475.429,237.714 402.286,237.714 402.286,201.143 			"/> <rect x="237.714" y="146.286" width="54.857" height="219.429"/> </g> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                        </div>
                    </div>
                    <div class="send_comment_to_post">
                        <svg id="Layer_1" enable-background="new 0 0 496.007 496.007" height="512" viewBox="0 0 496.007 496.007" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m205.892 403.822c-6.25-6.25-16.38-6.25-22.63 0l-41.92 41.92c-6.25 6.24-6.25 16.38 0 22.62 6.206 6.226 16.348 6.282 22.63 0l41.92-41.92c6.25-6.251 6.25-16.38 0-22.62zm-113.71-113.711c-6.24-6.25-16.37-6.25-22.62 0l-41.92 41.92c-6.25 6.25-6.25 16.38 0 22.63 6.24 6.239 16.354 6.266 22.62 0l41.92-41.92c6.25-6.249 6.25-16.38 0-22.63zm75.81 37.901c-6.25-6.25-16.38-6.24-22.63 0l-106.24 106.24c-6.25 6.25-6.25 16.38 0 22.63 6.248 6.229 16.358 6.252 22.63 0l106.24-106.24c6.25-6.25 6.25-16.38 0-22.63zm327.2-307.02-151.62 464c-4.286 13.097-22.084 15.008-29.04 3.07l-101.96-175.35c-3.22-5.53-2.83-12.44.98-17.58l36.61-49.29-49.29 36.61c-5.14 3.81-12.05 4.2-17.58.98l-175.35-101.961c-11.896-6.919-10.066-24.741 3.07-29.04l464-151.62c12.402-4.047 24.245 7.727 20.18 20.181z"/></svg>
                    </div>
                </div>
                
                <!--  -->
                <div class="reacts_to_post">
                    <div class="bowl_reacted">
                        ${setStateLike}
                        <div class="count_Rect">
                            <span>${data.loves}</span>
                        </div>
                    </div>
                    <div class="bowl_reacted">
                        ${setStateDislike}
                        <div class="count_Rect">
                            <span>${data.hates}</span>
                        </div>
                    </div>
                    <div class="bowl_reacted">
                        <div class="icon_React">
                            <?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.626px" height="511.627px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve"> <g> <path d="M506.206,179.012L360.025,32.834c-3.617-3.617-7.898-5.426-12.847-5.426s-9.233,1.809-12.847,5.426 c-3.617,3.619-5.428,7.902-5.428,12.85v73.089h-63.953c-135.716,0-218.984,38.354-249.823,115.06C5.042,259.335,0,291.03,0,328.907 c0,31.594,12.087,74.514,36.259,128.762c0.57,1.335,1.566,3.614,2.996,6.849c1.429,3.233,2.712,6.088,3.854,8.565 c1.146,2.471,2.384,4.565,3.715,6.276c2.282,3.237,4.948,4.859,7.994,4.859c2.855,0,5.092-0.951,6.711-2.854 c1.615-1.902,2.424-4.284,2.424-7.132c0-1.718-0.238-4.236-0.715-7.569c-0.476-3.333-0.715-5.564-0.715-6.708 c-0.953-12.938-1.429-24.653-1.429-35.114c0-19.223,1.668-36.449,4.996-51.675c3.333-15.229,7.948-28.407,13.85-39.543 c5.901-11.14,13.512-20.745,22.841-28.835c9.325-8.09,19.364-14.702,30.118-19.842c10.756-5.141,23.413-9.186,37.974-12.135 c14.56-2.95,29.215-4.997,43.968-6.14s31.455-1.711,50.109-1.711h63.953v73.091c0,4.948,1.807,9.232,5.421,12.847 c3.62,3.613,7.901,5.424,12.847,5.424c4.948,0,9.232-1.811,12.854-5.424l146.178-146.183c3.617-3.617,5.424-7.898,5.424-12.847 C511.626,186.92,509.82,182.636,506.206,179.012z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                        </div>
                        <div class="count_Rect">
                            <span>${data.shares}</span>
                        </div>
                    </div>
                </div>
            </div>
                `
            autoHeightText()
            likedTest()
            getOldComments(data.id_comments)
    
        }
    
    }).catch(console.log)
}


















function autoHeightText(){
    
    let textarea_comment = document.querySelectorAll(".textarea_comment");
    let btnSendComments = document.querySelectorAll(".send_comment_to_post");
    
        textarea_comment.forEach(bowlText =>{
            bowlText.addEventListener("input", ()=>{
                let str = bowlText.value
                let lines = (str.match(/\n/g) || '' || str.length >=49).length + 1
                bowlText.style.height = `0px`;
                bowlText.style.height = `${lines * 22 + 22}px`;
            });
        })
    
    
        //add send new comments
        btnSendComments.forEach( comment =>{
            comment.addEventListener("click", ()=>{
    
                // let text_comment = comment.value
                // let idCommets = comment.getAttribute('data-id_commets')
    
                let option = {
                    text_comment: comment.parentElement.children[0].children[0].value ,
                    idCommets: comment.parentElement.getAttribute('data-id_commets')
                }
                // fetch send data
                fetch("/comments/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    body: JSON.stringify(option),
                    })
                    .then(data => {
                       return data.json()
                    })
                    .then(data => {
                        // console.log(data);
    
                            fetch(`/comments/insert/`)
                            .then(insert =>{
                                return insert.json()
                            })
                            .then(insert =>{
                                let data = {...insert, ...option}
                                console.log(data.id_comments);
                                let insertComment = document.querySelector(`.insert_${data.idCommets}`);
                                console.log(data);
    
                                let textTag = ``
                                let msgText = data.text_comment.split('\n')
                                for (let m = 0; m < msgText.length; m++) {
                                    textTag += `<span>${msgText[m]}</span> </br>`
                                }
    
                                insertComment.innerHTML += `
                                <div class="line_comment">
                                    <div class="user_send">
                                        <div class="avatar_user_comment">
                                            <a href="/page/${data.username}">
                                                <img src="${data.avatar}" alt="">
                                            </a>
                                        </div>
                                        <div class="username_coment_info">
                                                <a href="/page/${data.username}">@${data.username}</a>
                                                <span class="timeMsgComment ">${data.allDate}</span>
                                            <div class="content_msg">
                                                ${textTag}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `
    
    
                            }).catch(console.log)
    
                    })
                    .catch((err) => console.log(err));
    
            comment.parentElement.children[0].children[0].value = ''
            comment.parentElement.children[0].children[0].style.height = '40px'
        });
    
        })
    
    
    }
        
    function likedTest(){
    
        let icon_React_like = document.querySelectorAll(".icon_React_like");
        let icon_React_dislike = document.querySelectorAll(".icon_React_dislike");
    
        icon_React_like.forEach(post =>{
            post.addEventListener('click', ()=>{
    
                let username = post.getAttribute('data-username')
                let id_post = post.getAttribute('data-id_post')
                let stateLike = post.getAttribute('data-like')
    
                let checkAnotherLike =  post.parentElement.parentElement.children[1].children[0].getAttribute('data-dislike')
                if(checkAnotherLike === 'true'){
                    post.parentElement.parentElement.children[1].children[0].setAttribute('data-dislike', 'false')
                    post.parentElement.parentElement.children[1].children[1].children[0].textContent--
                    post.parentElement.parentElement.children[1].children[0].innerHTML = 
                     `<svg class="nodisliked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z" class="style-scope yt-icon"></path></g></svg>`                
                     fetch(`/likes/dislike/${username}/${id_post}/true/`)
                     .then(data => {
                         return data.json()
                     })
                     .then(data =>{
                         console.log('done remove dislike');
                     }).catch(console.log)
                }
    
    
                if(stateLike === 'false'){
    
                    post.innerHTML = `<svg class="liked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z" class="style-scope yt-icon"></path></g></svg>`
                    fetch(`/likes/like/${username}/${id_post}/${stateLike}/`)
                    .then(data => {
                        return data.json()
                    })
                    .then(data =>{
                        // console.log(data);
                        post.parentElement.children[1].children[0].textContent =  Number(post.parentElement.children[1].children[0].textContent) + 1
                        post.setAttribute('data-like', 'true')
                    }).catch(console.log)
    
    
                }else{
    
                   post.innerHTML = ` <svg class="noliked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" class="style-scope yt-icon"></path></g></svg>`
                   fetch(`/likes/like/${username}/${id_post}/${stateLike}/`)
                   .then(data => {
                       return data.json()
                   })
                   .then(data =>{
                       // console.log(data);
                       post.parentElement.children[1].children[0].textContent =  Number(post.parentElement.children[1].children[0].textContent) - 1
                       post.setAttribute('data-like', 'false')
                   }).catch(console.log)
    
                }
    
            })
    
        })
    
        icon_React_dislike.forEach(post =>{
            post.addEventListener('click', ()=>{
                let username = post.getAttribute('data-username')
                let id_post = post.getAttribute('data-id_post')
                let stateLike = post.getAttribute('data-dislike')
    
                
                let checkAnotherLike =  post.parentElement.parentElement.children[0].children[0].getAttribute('data-like')
                if(checkAnotherLike === 'true'){
                    post.parentElement.parentElement.children[0].children[0].setAttribute('data-like', 'false')
                    post.parentElement.parentElement.children[0].children[1].children[0].textContent--
                    post.parentElement.parentElement.children[0].children[0].innerHTML = 
                   ` <svg class="noliked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" class="style-scope yt-icon"></path></g></svg>`
                   fetch(`/likes/like/${username}/${id_post}/true/`)
                     .then(data => {
                         return data.json()
                     })
                     .then(data =>{
                         console.log('done remove like');
                     }).catch(console.log)
                }
    
                console.log(stateLike);
                if(stateLike === 'false'){
                   post.innerHTML = `<svg class="disliked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M18,4h3v10h-3V4z M5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21c0.58,0,1.14-0.24,1.52-0.65L17,14V4H6.57 C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14z" class="style-scope yt-icon"></path></g></svg>`              
                    
                    fetch(`/likes/dislike/${username}/${id_post}/${stateLike}/`)
                    .then(data => {
                        return data.json()
                    })
                    .then(data =>{
                        // console.log(data);
                        post.parentElement.children[1].children[0].textContent =  Number(post.parentElement.children[1].children[0].textContent) + 1
                        post.setAttribute('data-dislike', 'true')
                    }).catch(console.log)
                }else{
                    post.innerHTML = `<svg class="nodisliked" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z" class="style-scope yt-icon"></path></g></svg>`                
                   fetch(`/likes/dislike/${username}/${id_post}/${stateLike}/`)
                   .then(data => {
                       return data.json()
                   })
                   .then(data =>{
                       // console.log(data);
                       post.parentElement.children[1].children[0].textContent =  Number(post.parentElement.children[1].children[0].textContent) - 1
                       post.setAttribute('data-dislike', 'false')
                   }).catch(console.log)
                }
            })
        })
    }
    
    function getOldComments(id_comments){
    
      
        fetch(`/comments/get/${id_comments}`)
        .then(data =>{
         return data.json()
        })
        .then(data =>{
            console.log(data);
           let contentComments = document.querySelector(`.content_old_${id_comments}`);
            for (let i = data.length - 1; i >= 0; i--) {
    
                let textTag = ``
                let msgText = data[i].text.split('\n')
                for (let m = 0; m < msgText.length; m++) {
                    textTag += `<span>${msgText[m]}</span> </br>`
                }
                
                contentComments.innerHTML +=`
                <div class="line_comment">
                    <div class="user_send">
                        <div class="avatar_user_comment">
                            <a href="/page/${data[i].username}">
                                <img src="${data[i].avatar}" alt="">
                            </a>
                        </div>
                        <div class="username_coment_info">
                                <a href="/page/${data[i].username}">@${data[i].username}</a>
                                <span class="timeMsgComment ">${data[i].date}</span>
                            <div class="content_msg">
                                ${textTag}
                            </div>
                        </div>
                    </div>
                </div>
            `
            } 
    
    }).catch(console.log)
    
       
    }
    
    