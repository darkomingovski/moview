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
    const $app = $(`<div class="app-grid-container">
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
        <li id="popular"><i class="fas fa-fire-alt"></i>MOST POPULAR</li>
    </ul>
    </div>
    <div class="logout">
    <div><i class="fas fa-sign-out-alt fa-2x"></i></div>
    <div>Log out</div>
    </div>
    <div class="search">
    <h2>search</h2>
    <div>enter movie or tv show title</div>
    <input type="text" name="movie_search" id="movie_search"><button id="movie_search_button">Search</button>
    </div>
    <div class="app">
    <div id="app-title"></div>
    <div id="item-container"></div></div>
</div>`);
$app.appendTo('body');
}

function _renderItems(response, query) {
    let $title = query;
    $title.appendTo('#app-title');
    $('#item-container').empty();
    for(const a of response) {
        const $item = $(`
        <div class="dbItem">
        <div class="dbItem-img"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${a.poster_path}" alt=""></div>
        <div class="imdb">${a.id}</div>
        <div class="item-title">${a.original_title}</div>
        <div class="item-year">${a.release_date}</div>
        <div class="item-genre">${a.genre_ids}</div>
    </div>`);
    $item.appendTo('#item-container');
    }
}

async function searchFromDB() {
    const $input = $('#movie_search').val();
    const response = await api.get(`/search/multi?api_key=bc686fdcbe90e509852ae370ae0a46f7&query=${$input}`);
    let resultFromDbQuery = response.data.results;
    let $search = $(`<h2>search result for query: ${$input}</h2>`);
    _renderItems(resultFromDbQuery, $search)
}

export { _renderApp, searchFromDB }