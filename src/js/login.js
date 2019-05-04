import $ from "jquery";
import { api_json } from './main';

async function getBase(location) {
    const responseFromBase = await api_json.get(`${location}`);
    return responseFromBase.data;
}

async function userLogin() {
    const $username = $('#username-login').val();
    const $password = $('#password-login').val();
    const usersFromBase = await getBase(`/users`);

    for (const user of usersFromBase) {
        if (user.username === $username && user.password === $password) {
            localStorage.setItem('validation', 'ok');
            localStorage.setItem('id', user.id);
            localStorage.setItem('user', user.firstname);
            localStorage.setItem('username', user.username);
        }
    }
    if (localStorage.getItem('validation') === 'ok') {
        $('#login-form').slideToggle();
        $(".grid-container").toggleClass("grid-container-blur");
        location.href = 'app.html';
    } else {
        $('#username').css('border', '1.5px solid rgb(250, 100, 100)');
        $('#password').css('border', '1.5px solid rgb(250, 100, 100)');
        $('#alert').html(`Invalid username and password. Please try again.`).css('color', 'rgb(250, 100, 100)');
    }
}

function userLogout() {
    localStorage.clear();
    location.href = 'index.html';
}

export { userLogin, userLogout }