const nav = document.querySelector('nav')
nav.innerHTML = `
<div class="content_nav">
    <div class="bowl_nav">
        <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0"/></svg>
        <div class="title_bowl_nav">
            <span>Home</span>
        </div>
    </div>
    <div class="bowl_nav">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480;" xml:space="preserve"> <g> <g> <path d="M459.782,347.328c-4.288-5.28-11.488-7.232-17.824-4.96c-17.76,6.368-37.024,9.632-57.312,9.632 c-97.056,0-176-78.976-176-176c0-58.4,28.832-112.768,77.12-145.472c5.472-3.712,8.096-10.4,6.624-16.832 S285.638,2.4,279.078,1.44C271.59,0.352,264.134,0,256.646,0c-132.352,0-240,107.648-240,240s107.648,240,240,240 c84,0,160.416-42.688,204.352-114.176C464.55,360.032,464.038,352.64,459.782,347.328z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
        <div class="title_bowl_nav">
            <span>Dark mode</span>
        </div>
    </div>
    <div class="bowl_nav bowl_login_nav">
        <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m465.535156.320312c-.53125-.042968-.980468-.320312-1.535156-.320312h-229.332031c-35.285157 0-64 28.714844-64 64v21.332031c0 11.777344 9.554687 21.335938 21.332031 21.335938s21.332031-9.558594 21.332031-21.335938v-21.332031c0-11.753906 9.578125-21.332031 21.335938-21.332031h99.390625l-6.507813 2.175781c-17.277343 5.972656-28.882812 22.25-28.882812 40.488281v320h-64c-11.757813 0-21.335938-9.578125-21.335938-21.332031v-42.667969c0-11.773437-9.554687-21.332031-21.332031-21.332031s-21.332031 9.558594-21.332031 21.332031v42.667969c0 35.285156 28.714843 64 64 64h64v21.332031c0 23.53125 19.132812 42.667969 42.664062 42.667969 4.566407 0 8.898438-.660156 13.589844-2.113281l128.171875-42.730469c17.300781-5.972656 28.90625-22.25 28.90625-40.488281v-384c0-24.875-21.441406-44.375-46.464844-42.347657zm0 0"/><path d="m228.414062 198.25-85.332031-85.332031c-6.101562-6.101563-15.273437-7.9375-23.253906-4.628907-7.957031 3.304688-13.160156 11.09375-13.160156 19.710938v64h-85.335938c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h85.335938v64c0 8.617187 5.203125 16.402343 13.160156 19.710937 7.980469 3.304688 17.152344 1.472656 23.253906-4.628906l85.332031-85.335938c8.34375-8.339843 8.34375-21.820312 0-30.164062zm0 0"/></svg>
        <div class="title_bowl_nav">
            <span>Log in</span>
        </div>
    </div>
</div>

<div class="pop_login_user"></div>

`
const bowl_login_nav = document.querySelector('.bowl_login_nav')
const pop_login_user = document.querySelector('.pop_login_user')
bowl_login_nav.addEventListener('click', ()=>{
    pop_login_user.classList.add('active')
    pop_login_user.innerHTML =  `
            <div class="content_pop_login">
                <div class="bowl_input_login">
                    <input type="text" name="username_login" class="username_login" placeholder="username">
                    <span class="error_input_user">Incorrect username</span>
                </div>
                <div class="bowl_input_login">
                    <input type="password" name="password_login" class="password_login" placeholder="password">
                    <span class="error_input_pass">Incorrect password</span>
                </div>
                <div class="bowl_input_login">
                    <button class="btn_send_login">Log in</button>
                </div>
                <div class="or_register_option">
                    <span>or</span>
                </div>
                <div class="bowl_input_login">
                    <button class="btn_go_register">Register</button>
                </div>
                </div>
            <div class="btn_close_pop_login">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"> <g> <g> <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872 c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872 c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052 L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116 c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952 c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116 c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
            </div>
            `
     closePopLogin()
     callRegister()
     sendDataLogin()
})


function callRegister(){
const btn_go_register = document.querySelector('.btn_go_register')
    btn_go_register.addEventListener('click', ()=>{
        pop_login_user.innerHTML = `
            <div class="content_pop_register">
                <div class="bowl_input_register">
                    <input type="text" name="fname_register" class="fname_register" placeholder="full name">
                    <span class="error_input_fname">Only letters</span>
                </div>
                <div class="bowl_input_register">
                    <input type="text" name="username_register" class="username_register" placeholder="username">
                    <span class="error_input_user_reg">You cannot use symbols except (_)</span>
                </div>
                <div class="bowl_input_register">
                    <input type="email" name="email_register" class="email_register" placeholder="email.@mail.co">
                    <span class="error_input_email_reg">Incorrect Email</span>
                </div>
                <div class="bowl_input_register">
                    <input type="password" name="password_register" class="password_register" placeholder="password">
                    <span class="error_input_pass_reg">More than 7 digits (characters, symbols and numbers)</span>
                </div>
                <div class="system_join">
                    <span>By clicking register, you agree to the Terms and Conditions of Use</span>
                </div>
                <div class="bowl_input_register">
                    <button class="btn_send_register">Register</button>
                </div>
            </div>
            <div class="closePopRegister">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"> <g> <g> <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872 c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872 c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052 L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116 c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952 c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116 c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
            </div>

        `
    closePopLoginRegister()
    sendDataRegisster()
    })
}

function closePopLogin(){
    const btn_close_pop_login = document.querySelector('.btn_close_pop_login')
    btn_close_pop_login.addEventListener('click', ()=>{
        pop_login_user.innerHTML = ''
        pop_login_user.classList.remove('active')
    })
}

function closePopLoginRegister(){
    const closePopRegister = document.querySelector('.closePopRegister')
    closePopRegister.addEventListener('click', ()=>{
        pop_login_user.innerHTML = ''
        pop_login_user.classList.remove('active')
    })
}






// work with server now



function sendDataLogin(){
    const btn_send_login = document.querySelector('.btn_send_login')
    const usernameLogin = document.querySelector('.username_login')
    const passwordLogin = document.querySelector('.password_login')
    btn_send_login.addEventListener('click', ()=>{
    let username_login =usernameLogin.value
    let password_login = passwordLogin.value

    fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                username_login,
                password_login,
            }),
          }).then((response) => response.json())
            .then((res) => {
                console.log("response> ", res)
                if( res.err_user){
                    document.querySelector('.error_input_user').classList.add('error')
                }             
                if( res.err_pass){
                    console.log("err_pass");
                    document.querySelector('.error_input_user').classList.remove('error')
                    document.querySelector('.error_input_pass').classList.add('error')
                }
                if(res.loginTrue){
                    document.querySelector('.error_input_pass').classList.remove('error')
                    location.assign('/home')
                }
                if( res.includes('username_login')){
                    document.querySelector('.error_input_user').classList.add('error')
                    setTimeout(()=>{
                    document.querySelector('.error_input_user').classList.remove('error')
                },3000)
            }
            if( res.includes('password_login')){
                document.querySelector('.error_input_pass').classList.add('error')
                setTimeout(()=>{
                document.querySelector('.error_input_pass').classList.remove('error')
            },3000)
        }
            })
            .catch((err) => console.log(err));

    })
}




function sendDataRegisster(){

    const btn_send_register = document.querySelector('.btn_send_register')
    btn_send_register.addEventListener('click', ()=>{
        const fname_register = document.querySelector('.fname_register').value
        const username_register = document.querySelector('.username_register').value
        const email_register = document.querySelector('.email_register').value
        const password_register = document.querySelector('.password_register').value
        fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                fname_register,
                username_register,
                email_register,
                password_register,
            }),
          }).then((response) => response.json())
            .then((res) => {
                console.log(res);

                if(res.register_done){
                   location.assign('/edit')

                }else{

                    if( res.includes('(username)')){
                        document.querySelector('.error_input_user_reg').textContent = 'Username not available'
                        document.querySelector('.error_input_user_reg').classList.add('error')
                        setTimeout(()=>{
                            document.querySelector('.error_input_user_reg').classList.remove('error')
                        },3000)
                    }   

                    if( res.includes('(email)')){
                        document.querySelector('.error_input_email_reg').textContent = 'Email already exists'
                        document.querySelector('.error_input_email_reg').classList.add('error')
                        setTimeout(()=>{
                            document.querySelector('.error_input_email_reg').classList.remove('error')
                        },3000)
                    }   


                    if( res.includes('fname_register')){
                        document.querySelector('.error_input_fname').classList.add('error')
                        setTimeout(()=>{
                            document.querySelector('.error_input_fname').classList.remove('error')
                        },3000)
                    }   

                    if( res.includes('username_register')){
                        document.querySelector('.error_input_user_reg').classList.add('error')
                        setTimeout(()=>{
                        document.querySelector('.error_input_user_reg').classList.remove('error')
                    },3000)

                    }   

                    if( res.includes('email_register')){
                        document.querySelector('.error_input_email_reg').classList.add('error')
                        setTimeout(()=>{
                        document.querySelector('.error_input_email_reg').classList.remove('error')
                    },3000)
        
                    }   

                    if( res.includes('password_register')){
                        document.querySelector('.error_input_pass_reg').classList.add('error')
                        setTimeout(()=>{
                        document.querySelector('.error_input_pass_reg').classList.remove('error')
                    },3000)
        
                    }   
                }// slash else


            })
            .catch((err) => console.log(err));
    })
}




