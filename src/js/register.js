import $ from "jquery";
import { createUser } from './user';
import { api_json } from './main';

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
                    </div></div>
    <div class="button-wrapper">
    <button type="reset" class="register-button">RESET</button>
    <button type="button" class="register-button" id="register-button">SEND</button></form>`);
    $registerUser.appendTo('body');
}

async function postIntoBase(location, obj, message) {
    await api_json.post(`/${location}`, obj);
    alert(`${message}`);
}
let count = 0;
function registerUser() {
    let obj = createUser(count);
    const check = Object.values(obj);
    const $form = $("#registration-form");
    obj == null ? count++ : count;
    check.includes("") ? count++ : count;
    if (count === 0) {
        const message = 'Registration successful';
        (async () => await postIntoBase('users', obj, message))();
        setTimeout(() => { $form.slideToggle(); $(".grid-container").toggleClass("grid-container-blur"); }, 500);
        $form[0].reset();
    } else {
        alert('One or more fields have an error. Please check and try again.');
        count = 0;
    }
}

function validateFormInput() {
    let checkRegexType = event.currentTarget.name;
    let $inputCheck = $(`#input-${checkRegexType}`);
    const RegEx = {
        firstname: /^[A-ZŠĐŽĆČ][a-zšđčćž]{1,11}\s?([A-ZŠĐŽĆČ][a-zšđčćž]{1,11})?$/,
        lastname: /^[A-ZŠĐŽĆČ][a-zšđčćž]{1,11}\s?([A-ZŠĐŽĆČ][a-zšđčćž]{1,11})?$/,
        username: /^[a-zA-Z0-9.\-_$@*!]{3,20}$/,
        password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        email: /^[a-z\-.]{3,}@[a-z]{3,30}.[a-z]{2,3}$/
    };
    let input = event.currentTarget.value;
    if (RegEx[checkRegexType].test(input) === true) {
        count = 0;
        $inputCheck.find('.fa-check-circle, .fa-times-circle').remove();
        $inputCheck.append('<i class="far fa-check-circle fa-2x"></i>');
    } else {
        count = 1;
        $inputCheck.find('.fa-check-circle, .fa-times-circle').remove();
        $inputCheck.append('<i class="far fa-times-circle fa-2x"></i>');
    }

}

export { userRegistrationForm, validateFormInput, registerUser, count }