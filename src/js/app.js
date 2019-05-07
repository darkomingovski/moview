import $ from "jquery";
import { Spinner } from 'spin.js';
import { checkMovieDetailsFromResponse, checkMovieDetailsFromJson, checkMovieIconPlanned, checkMovieIconWatched } from './compare-db';
import { recentlyWatched, plannedToWatch } from './watchlist';
import { api } from './main';

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
    };
    let target = $("body")[0];
    spinner = new Spinner(opts).spin(target);
    return spinner;
}

function _renderApp() {
    const $user = localStorage.getItem('user');
    $('body').empty();
    const $app = $(`
    <div class="app-content">
    <div class="fixed-content">
    <div class="user">
        <img src="img/user.png" alt="">
        <h3>Hi, ${$user}</h3>
    </div>
    <div class="nav">
    <ul>
        <li id="movies" title="Movie"><i class="fas fa-film"></i>MOVIES</li>
        <li id="shows" title="TV"><i class="fas fa-tv"></i>TV SHOWS</li>
        <li id="recently" title="Movie"><i class="fas fa-history"></i>WATCHED MOVIES</li>
        <li id="recently-tv" title="TV"><i class="fas fa-history"></i>WATCHED TV SHOWS</li>
        <li id="planned" title="Movie"><i class="fas fa-play-circle"></i>MOVIES PLANNED</li>
        <li id="planned-tv" title="TV"><i class="fas fa-play-circle"></i>TV SHOWS PLANNED</li>
        <li id="popular" title="Movie"><i class="fas fa-fire-alt"></i>NOW POPULAR</li>
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
    window.scrollTo(0, 0);
    $('#app-title').empty();
    query.appendTo('#app-title');
    $('#item-container').empty();
    for (const a of response) {
        if (a.media_type === 'person') {
            continue;
        }
        let genresList = [];
        const plus = (`fas fa-plus-square`);
        const minus = (`fas fa-minus-square`);
        const eyed = (`far fa-eye`);
        const unEyed = (`far fa-eye-slash`);
        let checkDetailsResponse = await checkMovieDetailsFromResponse(a, genresList);
        let checkDetailsJson = await checkMovieDetailsFromJson(a.id, checkDetailsResponse[1], a.type);
        let emoji_watch; let emoji_eye; let title_watched; let title_planned;
        checkDetailsJson[0] === true ? emoji_watch = minus : emoji_watch = plus;
        checkDetailsJson[1] === true ? emoji_eye = eyed : emoji_eye = unEyed;
        emoji_watch === minus ? title_planned = 'remove from planned' : title_planned = 'add to planned';
        emoji_eye === eyed ? title_watched = 'remove from watched' : title_watched = 'add to watched';
        const $tmdb_link = checkDetailsResponse[0].type.toLowerCase();
        const $item = $(`
        <div class="dbItem" id="dbItem_${checkDetailsResponse[0].id}">
        <div class="dbItem-img"><img src="${checkDetailsResponse[0].poster_path}" alt="movie-poster">
        <div class="overlay" id="${checkDetailsResponse[0].id}" data-type="${checkDetailsResponse[0].type}"><i class="${emoji_watch} icon-bottom" id="planned_${checkDetailsResponse[0].id}" title="${title_planned}"></i><i class="${emoji_eye} icon-top" id="watched_${checkDetailsResponse[0].id}" title="${title_watched}"></i></div>
        </div>
        <div class="details-wrap" title="open on tmdb" onclick="window.open('https://www.themoviedb.org/${$tmdb_link}/${checkDetailsResponse[0].id}', '_blank')">
        <div class="tmdb-vote">Score: ${checkDetailsResponse[0].vote_average}</div>
        <div class="item-title">${checkDetailsResponse[0].original_title}</div>
        <div class="item-year">${checkDetailsResponse[0].type} released: ${(a.release_date).slice(0, 4)}</div>
        <div class="item-genre">${checkDetailsJson[2].join(', ')}</div>
        </div>
    </div>`);
        $item.appendTo('#item-container');
    }
    $('.fa-plus-square, .fa-minus-square').on('click', checkMovieIconPlanned);
    $('.fa-eye-slash, .fa-eye').on('click', checkMovieIconWatched);
    spinner.stop();
}

async function searchFromDB() {
    const $input = $('#movie_search').val();
    if ($input !== '') {
        startSpinner();
        const response = await api.get(`/search/multi?api_key=bc686fdcbe90e509852ae370ae0a46f7&query=${$input}`);
        let resultFromDbQuery = response.data.results;
        let $search = $(`<h2>search result for query: ${$input}</h2>`);
        _renderItems(resultFromDbQuery, $search)
    }
}

async function newMoviesInTheater() {
    startSpinner();
    const response = await api.get(`/movie/now_playing?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
    let resultFromDbQuery = response.data.results;
    let $title = $(`<h2>now playing in theaters</h2>`);
    _renderItems(resultFromDbQuery, $title)
}

async function latestOnTv() {
    startSpinner();
    const response = await api.get(`/tv/on_the_air?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
    let resultFromDbQuery = response.data.results;
    let $title = $(`<h2>latest aired on tv</h2>`);
    _renderItems(resultFromDbQuery, $title)
}

async function nowPopular() {
    startSpinner();
    const response = await api.get(`/movie/popular?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
    let resultFromDbQuery = response.data.results;
    let $title = $(`<h2>currently popular movies</h2>`);
    _renderItems(resultFromDbQuery, $title)
}

export { _renderApp, _renderItems, searchFromDB, newMoviesInTheater, latestOnTv, nowPopular, recentlyWatched, plannedToWatch, startSpinner, spinner }