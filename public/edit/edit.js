const label_image_up_avatar = document.querySelector('.label_image_up_avatar')
const file_image_up_avatar = document.querySelector('.file_image_up_avatar')
const edit_avatar = document.querySelector('.edit_avatar')
const avatarSrc = document.querySelector('.area_view_avatar img')
const pop_edit_avatar = document.querySelector('.pop_edit_avatar')
const cancel_btn_avatar = document.querySelector('.cancel_btn_avatar')
const edit_btn_avatar = document.querySelector('.edit_btn_avatar')
const label_image_up_background = document.querySelector('.label_image_up_background')
const file_image_up_background = document.querySelector('.file_image_up_background')
const area_view_background = document.querySelector('.area_view_background img')
const btn_edit_background = document.querySelector('.btn_edit_background')
const pop_edit_background = document.querySelector('.pop_edit_background')
const cancel_btn_background = document.querySelector('.cancel_btn_background')
const edit_btn_background = document.querySelector('.edit_btn_background')
const send_save_edit = document.querySelector('.send_save_edit')
const bio_content = document.querySelector('.bio_content')
const select_option_country = document.querySelector('.select_option_country')
const birthday_date = document.querySelector('.birthday_date')
const select_option_gender = document.querySelector('.select_option_gender')
const job = document.querySelector('.job')
const facebook = document.querySelector('.facebook')
const instagram = document.querySelector('.instagram')
const hobbies = document.querySelector('.hobbies')
const bowl_error_inputs = document.querySelector('.bowl_error_inputs')




edit_avatar.addEventListener('click',()=>{
    pop_edit_avatar.classList.add('active')
})

cancel_btn_avatar.addEventListener('click',()=>{
    pop_edit_avatar.classList.remove('active')
})


label_image_up_avatar.addEventListener('click',event=>{
    file_image_up_avatar.addEventListener('change', event=>{
        const  file = file_image_up_avatar.files[0]
        console.log(file);
        if(file){
            const reader = new FileReader()
            reader.addEventListener('load',  ()=>{
                const result = reader.result
                avatarSrc.src = result
        })
        reader.readAsDataURL(file)
        }
    })
})

















//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////

// edit_btn_avatar.addEventListener('click',()=>{

//     fetch("/edit/avatar", {
//         method: "POST",
//         headers: { "Content-Type": "application/json; charset=utf-8" },
//         body: JSON.stringify({
//             avatar: file_image_up_avatar.files[0],
//         }),
//       })
//     .then((response) => response.json())
//     .then((res) => console.log("response", res))
//     .catch((err) => console.log(err));

// })





















btn_edit_background.addEventListener('click',()=>{
    pop_edit_background.classList.add('active')
})

cancel_btn_background.addEventListener('click',()=>{
    pop_edit_background.classList.remove('active')
})

label_image_up_background.addEventListener('click',event=>{
    file_image_up_background.addEventListener('change', event=>{
        const  file = file_image_up_background.files[0]
        console.log(file);
        if(file){
            const reader = new FileReader()
            reader.addEventListener('load',  ()=>{
                const result = reader.result
                area_view_background.src = result
        })
        reader.readAsDataURL(file)
        }
    })
})







// save info lines



send_save_edit.addEventListener('click',()=>{
        let option = {
        bio: bio_content.value,
        country: select_option_country.value,
        birthday: birthday_date.value,
        gender: select_option_gender.value,
        job: job.value,
        facebook: facebook.value,
        instagram: instagram.value,
        hobbies: hobbies.value
    }
    let errorStell = false
    for (const key in option) {
        if(option[key]){
            bowl_error_inputs.classList.remove('error')
            errorStell = true
        }
        else{
            bowl_error_inputs.classList.add('error')
            errorStell = false
        }
    }

    if(option.birthday.length < 5){
        bowl_error_inputs.classList.add('error')
        errorStell = false
    }
    if(option.country === 'none' || option.gender === 'none'){
        bowl_error_inputs.classList.add('error')
        errorStell = false
    }

    if(errorStell === true){
       
            // fetch send data
            fetch("/edit/info", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(option),
              })
            .then((response) => {response.json()
                location.assign('/profile')
            })
            .catch((err) => console.log(err));
    }

})


const avatar_user = document.querySelector('.avatar_user img')
const back_img_profile = document.querySelector('.back_img_profile img')


fetch('/edit/getinfo')
.then(data => {
    return data.json()
})
.then(data =>{bio_content
    avatar_user.src = data.avatar
    back_img_profile.src = data.background
     bio_content.value = data.bio
     select_option_country.value = data.country
     birthday_date.value = data.birthday
     select_option_gender.value = data.gender
     job.value = data.job
     facebook.value = data.facebook
     instagram.value = data.instagram
     hobbies.value = data.hobbies
    console.log(data);
})
.catch(console.log)







