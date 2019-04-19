import '@babel/polyfill';
import '../css/main.css';
import {getBase} from './register';
'use strict';


function _renderMain() {
    const $login = $(`<div class="grid-container">
    <div class="logo"></div>
    <div class="nav"></div>
    <div class="login"></div>
    <div class="main">
        <img src="./img/MOVIEW.png" alt="" srcset="">
        <div class="button-wrapper">
        <button class="main-button" type="submit">SIGN UP</button><button class="main-button" type="submit">LOG IN</button>
    </div>
    </div>
    <div class="footer"></div>
</div>`);
$login.appendTo('body');
}

$(document).on('load', _renderMain(), getBase());
