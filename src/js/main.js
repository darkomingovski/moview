import '@babel/polyfill';
import '../css/main.css';
import {userRegistrationForm, createUser, validateFormInput } from './register';
import {userLoginForm, userLogin, userLogout} from './login';
import {_renderApp, searchFromDB, newMoviesInTheater, latestOnTv, nowPopular, recentlyWatched, plannedToWatch} from './app';
'use strict';

function _renderMain() {
    const $login = $(`<div id="overflow-hack-for-image-blur"><div class="grid-container">
    <div class="main">
        <img src="./img/MOVIEW.png" alt="" srcset="">
        <div class="button-wrapper">
        <button class="main-button" id="register">SIGN&nbsp;UP</button><button class="main-button" id="login" type="submit">LOG&nbsp;IN</button>
    </div>
    </div>
    <div class="footer"><img src="./img/tmdblogo.png" alt="" srcset=""><div>This product uses the TMDb API but is not endorsed or certified by TMDb.</div></div>
</div></div>`);
$login.appendTo('body');
userRegistrationForm();
userLoginForm()
}

function onLoadHTML() {
    const page = location.href;
    if (page.search('/index.html') >= 0) {
        return _renderMain();
    } 
    else if (page.search('/app.html') >= 0) {
        return _renderApp();
    }
}
function toggleRegister() {
    $('#register, #close-register').click(function() {$('#registration-form').slideToggle();});
    $('#register, #close-register').click(function() {$(".grid-container").toggleClass("grid-container-blur");});
    $('#register, #close-register').click(function() {$('#register, #login').attr('disabled', !$('#register, #login').attr('disabled'));});
}
function toggleLogin() {
    $('#login, #close-login').click(function() {$('#login-form').slideToggle();});
    $('#login, #close-login').click(function() {$(".grid-container").toggleClass("grid-container-blur");});
    $('#login, #close-login, .register-button').click(function() {$('#register, #login').attr('disabled', !$('#register, #login').attr('disabled'));});
    $('#login, #close-login, #register, #close-register, .register-button').click(function() {$('.main-button').toggleClass('main-button-blur');});
}
function eventsAll() {
    $('#register-button').on('click', createUser);
    $('#login-button').on('click', userLogin);
    $('#movie_search_button').on('click', searchFromDB);
    $('#movies').on('click', newMoviesInTheater);
    $('#shows').on('click', latestOnTv);
    $('#recently').on('click', recentlyWatched);
    $('#planned').on('click', plannedToWatch);
    $('#popular').on('click', nowPopular);
    $('.logout-button').on('click', userLogout);
    $('.validity').blur(validateFormInput);
    //$('.validity').on('input', validateFormInput);
}

$(document).on('load', onLoadHTML(), toggleRegister(), toggleLogin(), eventsAll());