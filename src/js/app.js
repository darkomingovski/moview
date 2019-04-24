import axios from 'axios';

const serverUrl = `https://api.themoviedb.org/3`;
const api = axios.create({
    baseURL: `${serverUrl}`
});
api.defaults.timeout = 4000;

const serverUrl_json = `http://localhost:3000`;
const api_json = axios.create({
    baseURL: `${serverUrl_json}`
});
api_json.defaults.timeout = 4000;

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
        <li id="home"><i class="fas fa-home"></i>HOME</li>
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
}

async function addToPlanned() {
    const movie_id = +event.currentTarget.parentElement.id;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    if (data.planned.includes(movie_id) == false) {
        data.planned.push(movie_id);
        await api_json.patch(`/users/${user}`, data);
        $(`#planned_${+movie_id}`).toggleClass('far fas');
        $(`#planned_${+movie_id}`).toggleClass('fa-star fa-star');
    }
}

async function removeFromPlanned() {
    const movie_id = +event.currentTarget.parentElement.id;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    let position = data.planned.indexOf(movie_id);
    if (position != -1) {
        data.planned.splice(position,1);
        await api_json.patch(`/users/${user}`, data);
        $(`#planned_${+movie_id}`).toggleClass('far fas');
        $(`#planned_${+movie_id}`).toggleClass('fa-star fa-star');
    }
}

async function addToWatched() {
    const movie_id = +event.currentTarget.parentElement.id;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    if (data.watched.includes(movie_id) == false) {
        data.watched.push(movie_id);
        await api_json.patch(`/users/${user}`, data);
        $(`#watched_${+movie_id}`).toggleClass('far fas');
        $(`#watched_${+movie_id}`).toggleClass('fa-eye-slash fa-eye');
    }
}

async function removeFromWatched() {
    const movie_id = +event.currentTarget.parentElement.id;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    let position = data.watched.indexOf(movie_id);
    if (position != -1) {
        data.watched.splice(position,1);
        await api_json.patch(`/users/${user}`, data);
        $(`#watched_${+movie_id}`).toggleClass('far fas');
        $(`#watched_${+movie_id}`).toggleClass('fa-eye fa-eye-slash');
    }
}

async function _renderItems(response, query) {
    $('#app-title').empty();
    let $title = query;
    $title.appendTo('#app-title');
    $('#item-container').empty();
    for(const a of response) {
        const starred = ('fas'+' '+'fa-star');
        const unStarred = ('far'+' '+'fa-star');
        const eyed = ('fas'+' '+'fa-eye');
        const unEyed = ('far'+' '+'fa-eye-slash');
        if (a.original_title == undefined) { a.original_title = a.name;}
        if(a.release_date == undefined) {
            if(a.first_air_date == undefined) { a.release_date = 'none';}
            else { a.release_date = a.first_air_date;}
        }
        if(a.vote_average == 0) { a.vote_average = 'not rated';}
        let check = await checkMovie(a.id);
        let emoji; let emoji_e;
        check[0] == true ? emoji = starred : emoji = unStarred
        check[1] == true ? emoji_e = eyed : emoji_e = unEyed
        const $item = $(`
        <div class="dbItem" id="dbItem_${a.id}">
        <div class="dbItem-img" title="open on tmdb" onclick="window.open('https://www.themoviedb.org/movie/${a.id}', '_blank')";><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${a.poster_path}" alt=""></div>
        <div class="tmdb-vote" id="${a.id}">score: ${a.vote_average}<i class="${emoji}" id="planned_${a.id}"></i><i class="${emoji_e}" id="watched_${a.id}"></i></div>
        <div class="item-title">${a.original_title}</div>
        <div class="item-year">released: ${(a.release_date).slice(0,4)}</div>
        <div class="item-genre">genre: ${a.genre_ids}</div>
    </div>`);
    $item.appendTo('#item-container'); 
    }
    $('.fa-star').on('click', checkMovieIconPlanned);
    $('.fa-eye-slash, .fa-eye').on('click', checkMovieIconWatched);
}

async function checkMovie(id) {
    let planned; let watched;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    data.planned.indexOf(id) != -1 ? planned = true : planned = false;
    data.watched.indexOf(id) != -1 ? watched = true : watched = false;
    return [planned, watched]
}

function checkMovieIconPlanned() {
    $(event.target).hasClass('far') ? addToPlanned() : removeFromPlanned();
}
function checkMovieIconWatched() {
    $(event.target).hasClass('far') ? addToWatched() : removeFromWatched();
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

async function recentlyWatched() {
    const user = localStorage.getItem('id');
    const response_json = await api_json.get(`/users/${user}`);
    let resultFromJsonQuery = response_json.data.watched;
    let watchedList = [];
    for (const a of resultFromJsonQuery) {
        const response = await api.get(`/movie/${a}?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
        const resultFromDbQuery = response.data;
        watchedList.push(resultFromDbQuery)
    }
    let $title = $(`<h2>your recently watched movies</h2>`);
    _renderItems(watchedList, $title)
}

async function plannedToWatch() {
    const user = localStorage.getItem('id');
    const response_json = await api_json.get(`/users/${user}`);
    let resultFromJsonQuery = response_json.data.planned;
    let plannedList = [];
    for (const a of resultFromJsonQuery) {
        const response = await api.get(`/movie/${a}?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
        const resultFromDbQuery = response.data;
        plannedList.push(resultFromDbQuery)
    }
    let $title = $(`<h2>your recently watched movies</h2>`);
    _renderItems(plannedList, $title)
}

export { _renderApp, searchFromDB, newMoviesInTheater, latestOnTv, nowPopular, recentlyWatched, plannedToWatch }