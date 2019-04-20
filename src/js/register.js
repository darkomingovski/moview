import axios from 'axios';

const serverUrl = `http://localhost:3000`;
const api = axios.create({
    baseURL: `${serverUrl}`
});
api.defaults.timeout = 4000;

function userRegistrationForm() {
    const $registerUser = $(`<form id="registration-form"><div id="form-title">MOVIEW REGISTRATION<i id="close-register" class="far fa-times-circle"></i></div>
    <div class="form-container">
                    <div class="form-left"><br>
                    <input type="text" name="username" placeholder="username" required>
                    <span class="validity"></span><br>
                    <input type="text" name="name" placeholder="name" required>
                    <span class="validity"></span><br>
                    <input type="text" name="lastname" placeholder="lastname" required>
                    <span class="validity"></span><br>
                    </div>
                    <div class="form-right"><br>
                    <input type="email" name="email" placeholder="email" required>
                    <span class="validity"></span><br>
                    <input type="password" name="password" placeholder="password" required>
                    <span class="validity"></span><br>
                    <input type="password" name="passwordRepeat" placeholder="repeat&nbsp;password" required>
                    <span class="validity"></span><br>
                    </div>
    </div>
    <div class="button-wrapper">
    <button type="reset" class="register-button">RESET</button>
    <button type="button" class="register-button" id="register-button">SEND</button></form>`);
    $registerUser.appendTo('body');
}

async function postIntoBase(location, obj, message) {
    return await api.post(`/${location}`, obj)
        .then(alert(`${message}`))
        .catch((error) => {
            alert(error);
        });
}

function createUser() {
    const userObj = {};
    $("#registration-form").find("input").each(function () {
        userObj[this.name] = $(this).val();
    });
    delete userObj.passwordRepeat;
    userObj['favorites'] = [];

    const message = 'Uspesno ste se registrovali';
    (async () => await postIntoBase('users', userObj, message))();

    setTimeout(() => {$('#registration-form').slideToggle();$(".grid-container").toggleClass("grid-container-blur");}, 500);
}

export { userRegistrationForm, createUser }