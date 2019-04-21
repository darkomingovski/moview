import axios from 'axios';

const serverUrl_json = `http://localhost:3000`;
const api_json = axios.create({
    baseURL: `${serverUrl_json}`
});
api_json.defaults.timeout = 4000;

function userLoginForm() {
    const $registerUser = $(`<form id="login-form"><div id="form-title">MOVIEW LOGIN<i id="close-login" class="far fa-times-circle"></i></div>
    <div class="form-container">
                    <div class="form-left"><br>
                    <input type="text" name="username" id="username" placeholder="username" required>
                    </div>
                    <div class="form-right"><br>
                    <input type="password" name="password" id="password" placeholder="password" required>
                    </div>   
    </div><br>
    <div id="alert"></div>
    <div class="button-wrapper">
    <button type="reset" class="register-button">RESET</button>
    <button type="button" class="register-button" id="login-button">LOG IN</button></form>`);
    $registerUser.appendTo('body');
}

async function getBase(location) {
    const responsFromBase = await api_json.get(`${location}`);
    return responsFromBase.data;
}

async function userLogin() {
    const $username = $('#username').val();
    const $password = $('#password').val();
    const usersFromBase = await getBase(`/users`);

    for (const user of usersFromBase) {
        if (user.username === $username && user.password === $password) {
            localStorage.setItem('validation', true);
            localStorage.setItem('id', user.id);
            localStorage.setItem('user', user.name);
            localStorage.setItem('username', user.username);
        }
    }
    if (JSON.parse(localStorage.getItem('validation'))) {
        alert(`Uspesno ste se ulogovali!\nDobro došao/la ${localStorage.getItem('user')}`);
        $('#login-form').slideToggle();
        $(".grid-container").toggleClass("grid-container-blur");
        location.href = 'app.html';
    } else {
        $('#username').css('border', '1.5px solid rgb(250, 100, 100)');
        $('#password').css('border', '1.5px solid rgb(250, 100, 100)');
        $('#alert').html(`Nije dobar unos podataka za login`).css('color', 'rgb(250, 100, 100)');
    }
}

export { userLoginForm, userLogin }