import axios from 'axios';
import { Spinner } from 'spin.js';
import { checkMovieDetailsFromResponse, checkMovieDetailsFromJson, checkMovieIconPlanned, checkMovieIconWatched } from './compare-db';
import { recentlyWatched, plannedToWatch } from './watchlist';

let spinner = {};
function startSpinner() {
    let opts = {
        lines: 13,
        length: 38,
        width: 17,
        radius: 45,
        scale: 1,
        corners: 1,
        color: '#ffffff',
        fadeColor: 'transparent',
        speed: 1,
        rotate: 0,
        animation: 'spinner-line-fade-quick',
        direction: 1,
        zIndex: 2e9,
        className: 'spinner',
        top: '50%',
        left: '50%',
        shadow: '0 0 1px transparent',
        position: 'absolute'
       }
        let target = $("body")[0];
        spinner =  new Spinner(opts).spin(target);
        return spinner;
}

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

function _renderApp() {
    const $user = localStorage.getItem('user');
    $('body').empty();
    const $app = $(`
    <div class="app-content">
    <div class="fixed-content">
    <div class="user">
        <img src="img/user.png" alt="">
        <h2>Hi, ${$user}</h2>
    </div>
    <div class="nav">
    <ul>
        <li id="movies"><i class="fas fa-film"></i>MOVIES</li>
        <li id="shows"><i class="fas fa-tv"></i>TV SHOWS</li>
        <li id="recently"><i class="fas fa-history"></i>RECENTLY WATCHED</li>
        <li id="planned"><i class="fas fa-play-circle"></i>PLANNED TO WATCH</li>
        <li id="popular"><i class="fas fa-fire-alt"></i>NOW POPULAR</li>
    </ul>
    <div id="logout">
    <div><i class="fas fa-sign-out-alt fa-2x logout-button" title="Logout"></i></div>
    </div>
    </div>
    </div>
    <div class="app-grid-container">
    <div class="search">
    <h2>search</h2>
    <div>enter movie or tv show title</div>
    <input type="text" name="movie_search" id="movie_search"><button id="movie_search_button">Search</button>
    </div>
    <div class="app">
    <div id="app-title"></div>
    <div id="item-container"></div>
    </div>
</div>`);
$app.appendTo('body');
nowPopular()
}

async function _renderItems(response, query) {
    startSpinner();
    $('#app-title').empty();
    let $title = query;
    $title.appendTo('#app-title');
    $('#item-container').empty();
    for(const a of response) {
        let genres = [];
        const starred = ('fas'+' '+'fa-star');
        const unStarred = ('far'+' '+'fa-star');
        const eyed = ('fas'+' '+'fa-eye');
        const unEyed = ('far'+' '+'fa-eye-slash');
        let checkDetailsResponse = await checkMovieDetailsFromResponse(a, genres);
        let checkDetailsJson = await checkMovieDetailsFromJson(a.id, checkDetailsResponse[1]);
        let emoji_star; let emoji_eye;
        checkDetailsJson[0] == true ? emoji_star = starred : emoji_star = unStarred;
        checkDetailsJson[1] == true ? emoji_eye = eyed : emoji_eye = unEyed;
        const $item = $(`
        <div class="dbItem" id="dbItem_${checkDetailsResponse[0].id}">
        <div class="dbItem-img" title="open on tmdb" onclick="window.open('https://www.themoviedb.org/movie/${checkDetailsResponse[0].id}', '_blank')";><img src="${checkDetailsResponse[0].poster_path}" alt=""></div>
        <div class="tmdb-vote" id="${checkDetailsResponse[0].id}">Score: ${checkDetailsResponse[0].vote_average}<i class="${emoji_star}" id="planned_${checkDetailsResponse[0].id}"></i><i class="${emoji_eye}" id="watched_${checkDetailsResponse[0].id}"></i></div>
        <div class="item-title">${checkDetailsResponse[0].original_title}</div>
        <div class="item-year">Released: ${(a.release_date).slice(0,4)}</div>
        <div class="item-genre">${checkDetailsJson[2].join(', ')}</div>
    </div>`);
    $item.appendTo('#item-container'); 
    }
    $('.fa-star').on('click', checkMovieIconPlanned);
    $('.fa-eye-slash, .fa-eye').on('click', checkMovieIconWatched);
    spinner.stop();
}

async function searchFromDB() {
    const $input = $('#movie_search').val();
    const response = await api.get(`/search/multi?api_key=bc686fdcbe90e509852ae370ae0a46f7&query=${$input}`);
    let resultFromDbQuery = response.data.results;
    let $search = $(`<h2>search result for query: ${$input}</h2>`);
    _renderItems(resultFromDbQuery, $search)
}

async function newMoviesInTheater() {
    const response = await api.get(`/movie/now_playing?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
    let resultFromDbQuery = response.data.results;
    let $title = $(`<h2>now playing in theaters</h2>`);
    _renderItems(resultFromDbQuery, $title)
}

async function latestOnTv() {
    const response = await api.get(`/tv/on_the_air?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
    let resultFromDbQuery = response.data.results;
    let $title = $(`<h2>latest aired on tv</h2>`);
    _renderItems(resultFromDbQuery, $title)
}

async function nowPopular() {
    const response = await api.get(`/movie/popular?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
    let resultFromDbQuery = response.data.results;
    let $title = $(`<h2>currently popular movies</h2>`);
    _renderItems(resultFromDbQuery, $title)
}

export { _renderApp, _renderItems, searchFromDB, newMoviesInTheater, latestOnTv, nowPopular, recentlyWatched, plannedToWatch }