import '@babel/polyfill';
import '../css/main.css';
import $ from "jquery";
import { userRegistrationForm, validateFormInput, registerUser } from './register';
import { userLogin, userLogout } from './login';
import { _renderApp, searchFromDB, newMoviesInTheater, latestOnTv, nowPopular, recentlyWatched, plannedToWatch } from './app';
import axios from "axios";
'use strict';

const serverUrl = `https://api.themoviedb.org/3`;
const api = axios.create({
    baseURL: `${serverUrl}`
});
api.defaults.timeout = 6000;

const serverUrl_json = `http://localhost:3000`;
const api_json = axios.create({
    baseURL: `${serverUrl_json}`
});
api_json.defaults.timeout = 6000;

function _renderMain() {
    const $login = $(`<div class="grid-container">
    <a href="https://github.com/darkomingovski/moview"><img style="position: absolute; top: 0; right: 0; border: 0; width: 149px; height: 149px;" src="http://aral.github.com/fork-me-on-github-retina-ribbons/right-red@2x.png" alt="Fork me on GitHub"></a>
    <div class="login">
    <form id="login-form">
    <h3>Welcome to</h3>
    <h2>MOVIEW</h2>
    <div>Log in to get on the things that interest you</div>
    <div class="form-container">
                    <div class="form">
                    <input type="text" name="username" id="username-login" placeholder="username" required>
                    <br>
                    <input type="password" name="password" id="password-login" placeholder="password" required>
                    </div> 
    </div>
    <div id="alert"></div>
    <div class="button-wrapper-login">
    <button type="reset" class="button-login">RESET</button>
    <button type="button" class="button-login" id="login-button">LOG&nbsp;IN</button></div>
    <div class="login-bottom">Don't have an account?&nbsp;<a href="#" id="register-link">Sign up now!</a></div></form></div>
    <div class="main"><img src="./img/MOVIEW.png" alt="Logo"></div>
    <div class="footer"><img src="./img/tmdblogo.png" alt="TMBD-logo"><div>This product uses the TMDb API but is not endorsed or certified by TMDb.</div></div>
</div>`);
    $login.appendTo('body');
    userRegistrationForm();
}

function onLoadHTML() {
    const page = location.href;
    if (page.search('/index.html') >= 0) {
        return _renderMain();
    } else if (page.search('/app.html') >= 0) {
        return _renderApp();
    }
}
function toggleRegister() {
    $('#register-link, #close-register').on('click', () => $('#registration-form').slideToggle());
}

function registerEnterKey() {
    $("#login-form").keypress(function( event ) {
        if ( event.which === 13 ) {
            $("#login-button").trigger("click");
        }
    });
    $("#registration-form").keypress(function( event ) {
        if ( event.which === 13 ) {
            $("#register-button").trigger("click");
        }
    });
    $("#movie_search").keypress(function( event ) {
        if ( event.which === 13 ) {
            $("#movie_search_button").trigger("click");
        }
    });
}

function eventsAll() {
    $('#register-button').on('click', registerUser);
    $('#login-button').on('click', userLogin);
    $('#movie_search_button').on('click', searchFromDB);
    $('#movies').on('click', newMoviesInTheater);
    $('#shows').on('click', latestOnTv);
    $('#recently').on('click', recentlyWatched);
    $('#planned').on('click', plannedToWatch);
    $('#recently-tv').on('click', recentlyWatched);
    $('#planned-tv').on('click', plannedToWatch);
    $('#popular').on('click', nowPopular);
    $('.logout-button').on('click', userLogout);
    $('.validity').on('blur', validateFormInput);
}

$(document).on('load', onLoadHTML(), toggleRegister(), eventsAll(), registerEnterKey());

export { api, api_json }