// const nav = document.querySelector('nav')
const btn_pop_add_post = document.querySelector('.btn_pop_add_post')
const cancl_post_server = document.querySelector('.cancl_post_server')
const pop_create_add = document.querySelector('.pop_create_add')
const textarea_post_add = document.querySelector('.textarea_post_add')
const add_sempol_to_text = document.querySelectorAll('.add_sempol_to_text')
const media_upload_post_add = document.querySelector('.media_upload_post_add')
const image_View_pop_add = document.querySelector('.image_View_pop_add')
const add_img_content = document.querySelector('.image_View_pop_add')
const add_video_content = document.querySelector('.add_video_content')


// show pop add post
btn_pop_add_post.addEventListener('click',()=>{
    pop_create_add.classList.add('active')
})
cancl_post_server.addEventListener('click',(e)=>{
    e.preventDefault()
    pop_create_add.classList.remove('active')
    textarea_post_add.value = ''
    add_video_content.innerHTML = ''
    add_img_content.innerHTML = '<img class="image_View_pop_add" src="" alt="">'

})

// auto height textarea
textarea_post_add.addEventListener("input", ()=>{
    let str = textarea_post_add.value
    let lines = (str.match(/\n/g) || '' || str.length >=49).length + 1
    textarea_post_add.style.height = `0px`;
    textarea_post_add.style.height = `${lines * 22 + 22}px`;

});


// add #, @ or emoji
add_sempol_to_text.forEach(sempol=>{
    sempol.addEventListener('click',()=>{
        let dataKind = sempol.getAttribute('data-kind') 
        if(dataKind === "@"){
             textarea_post_add.value += ` ${dataKind} `
        }
        if(dataKind === "#"){
            textarea_post_add.value += ` ${dataKind} `
        }
        if(dataKind === "emoji"){
            textarea_post_add.value += ` ${dataKind} `
        }
    })
})



const btn_upload_images = document.querySelector('.btn_upload_images')
const input_upload_images = document.querySelector('.input_upload_images')
btn_upload_images.addEventListener('click',event=>{
    add_video_content.innerHTML = ''
    add_img_content.innerHTML = '<img class="image_View_pop_add" src="" alt="">'
    
    input_upload_images.addEventListener('change', event=>{
        const  file = input_upload_images.files[0]
        if(file){
            const reader = new FileReader()
            reader.addEventListener('load',  ()=>{
                const result = reader.result
                image_View_pop_add.src = result

                const newImg = new Image();
                newImg.addEventListener('load',()=>{
                    console.log(newImg.width );
                    console.log(newImg.height );
                    if(newImg.width >  newImg.height){
                        document.querySelector('.add_img_content img').style.width = '100%'
                        document.querySelector('.add_img_content img').style.height = '100%'
                    }
                    if(newImg.width < newImg.height){
                        document.querySelector('.add_img_content img').style.width = 'auto'
                    }
                })
                newImg.src =  result
        })
        reader.readAsDataURL(file)
        }
    })

})







const btn_upload_videos = document.querySelector('.btn_upload_videos')
const input_upload_Video = document.querySelector('.input_upload_Video')

btn_upload_videos.addEventListener('click',event=>{
    add_video_content.innerHTML = ''
    add_img_content.innerHTML = '<img class="image_View_pop_add" src="" alt="">'

    input_upload_Video.addEventListener('change', event=>{
        let file = input_upload_Video.files[0]
        if(file){
            const reader = new FileReader()
            reader.addEventListener('load',(el)=>{
                let linkPath = el.target.result
                add_video_content.innerHTML = `
                    <video src="${linkPath}" controls autoplay></video>
                `
            })
            reader.readAsDataURL(file)
        }
    })

})







