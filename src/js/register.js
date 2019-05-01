import axios from 'axios';

const serverUrl_json = `http://localhost:3000`;
const api_json = axios.create({
    baseURL: `${serverUrl_json}`
});
api_json.defaults.timeout = 4000;

function userRegistrationForm() {
    const $registerUser = $(`<form id="registration-form"><div id="form-title">MOVIEW REGISTRATION<i id="close-register" class="far fa-times-circle"></i></div>
    <div class="form-container">
                    <div class="form-left" id="form-left">
                    <div id="input-username">
                    <input type="text" name="username" id="username" placeholder="username" class="validity" required>
                    </div>
                    <div id="input-firstname">
                    <input type="text" name="firstname" id="firstname" placeholder="name" class="validity" required>
                    </div>
                    <div id="input-lastname">
                    <input type="text" name="lastname" id="lastname" placeholder="lastname" class="validity" required>
                    </div>
                    <div id="input-email">
                    <input type="email" name="email" id="email" placeholder="email" class="validity" required>
                    </div>
                    <div id="input-password">
                    <input type="password" name="password" id="password" placeholder="password" class="validity" required>
                    </div>
                    <div id="input-password-repeat">
                    <input type="password" name="passwordRepeat" id="password-repeat" placeholder="repeat&nbsp;password" required>
                    </div>
                    </div>
    </div>
    <div class="button-wrapper">
    <button type="reset" class="register-button">RESET</button>
    <button type="button" class="register-button" id="register-button">SEND</button></form>`);
    $registerUser.appendTo('body');
}

async function postIntoBase(location, obj, message) {
    return await api_json.post(`/${location}`, obj)
        .then(alert(`${message}`))
        .catch((error) => {
            alert(error);
        });
}
let count = 0;
function createUser() {
        const userObj = {};
        userObj.watched = [];
        userObj.planned = [];
        $("#registration-form").find("input").each(function () {
            userObj[this.name] = $(this).val();
        });
        delete userObj.passwordRepeat;
        userObj['favorites'] = [];
        const check = Object.values(userObj);
        check.includes("") ? count++ : count;
    if (count == 0) {
        const message = 'Uspesno ste se registrovali';
        (async () => await postIntoBase('users', userObj, message))();
        setTimeout(() => { $('#registration-form').slideToggle(); $(".grid-container").toggleClass("grid-container-blur"); }, 500);
        $('#registration-form')[0].reset();
    }
    else {
        alert('One or more fields have an error. Please check and try again.');
        count = 0;
    }
}

function validateFormInput() {
    let check = event.currentTarget.name;
    const RegEx = {
        firstname: /^[A-ZŠĐŽĆČ][a-zšđčćž]{1,11}\s?([A-ZŠĐŽĆČ][a-zšđčćž]{1,11})?$/,
        lastname: /^[A-ZŠĐŽĆČ][a-zšđčćž]{1,11}\s?([A-ZŠĐŽĆČ][a-zšđčćž]{1,11})?$/,
        username: /^[a-zA-Z0-9.\-_$@*!]{3,20}$/,
        password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        email: /^[a-z\-.]{3,}@[a-z]{3,30}.[a-z]{2,3}$/
    }
    let input = event.currentTarget.value;
    if (RegEx[check].test(input) == true) {
        if (document.getElementById(`${check}`).parentElement.parentElement.id == "form-left") {
            $(`#input-${check}`).find('.fa-times-circle').remove();
            $(`#input-${check}`).find('.fa-check-circle').remove();
            $(`#input-${check}`).append('<i class="far fa-check-circle fa-2x"></i>');
        }
        else {
            $(`#input-${check}`).apppend('<i class="far fa-check-circle fa-2x"></i>');
        }
    }
    if (RegEx[check].test(input) == false) {
        count = count + 1;
        if (document.getElementById(`${check}`).parentElement.parentElement.id == "form-left") {
            $(`#input-${check}`).find('.fa-check-circle').remove();
            $(`#input-${check}`).find('.fa-times-circle').remove();
            $(`#input-${check}`).append('<i class="far fa-times-circle fa-2x"></i>');
        }
        else {
            $(`#input-${check}`).apppend('<i class="far fa-times-circle fa-2x"></i>');
        }
    }
}

export { userRegistrationForm, createUser, validateFormInput }