import '@babel/polyfill';
import '../css/main.css';
import {userRegistrationForm, createUser} from './register';
import {userLoginForm, userLogin} from './login';
'use strict';

function _renderMain() {
    const $login = $(`<div id="overflow-hack-for-image-blur"><div class="grid-container">
    <div class="logo"></div>
    <div class="nav"></div>
    <div class="login"></div>
    <div class="main">
        <img src="./img/MOVIEW.png" alt="" srcset="">
        <div class="button-wrapper">
        <button class="main-button" id="register">SIGN UP</button><button class="main-button" id="login" type="submit">LOG IN</button>
    </div>
    </div>
    <div class="footer"></div>
</div></div>`);
$login.appendTo('body');
}

function onLoadHTML() {
    const page = location.href;
    if (page.search('/index.html') >= 0) {
        return _renderMain();
    } else if (page.search('/app.html') >= 0) {
        return _renderMain();
    } else if (page.search('/register.html') >= 0) {
        return userRegistrationForm();
    } else if (page.search('/login.html') >= 0) {
        return _renderMain();
    }
}
function toggleRegister() {
    $('#register, #close-register').click(function() {$('#registration-form').slideToggle();});
    $('#register, #close-register').click(function(){$(".grid-container").toggleClass("grid-container-blur");});
}
function toggleLogin() {
    $('#login').click(function() {$('#alert').empty();});
    $('#login, #close-login').click(function() {$('#login-form').slideToggle();});
    $('#login, #close-login').click(function(){$(".grid-container").toggleClass("grid-container-blur");});
}
function eventsAll() {
    $('#register-button').on('click', createUser);
    $('#login-button').on('click', userLogin);
}

$(document).on('load', onLoadHTML(), userRegistrationForm(), userLoginForm(), toggleRegister(), toggleLogin(), eventsAll());