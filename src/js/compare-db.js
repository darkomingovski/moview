import $ from "jquery";
import { addToPlanned, removeFromPlanned, addToWatched, removeFromWatched } from './watchlist';
import { api_json } from './main';

function checkMovieDetailsFromResponse(a, genresList) {
    if (a.original_title === undefined) { a.original_title = a.name; a.type = 'TV'; }
    if (a.release_date === undefined) {
        if (a.first_air_date === undefined) { a.release_date = 'none'; }
        else { a.release_date = a.first_air_date; }
    }
    if (a.vote_average === 0) { a.vote_average = 'not rated'; }
    if (a.genres === undefined) { genresList = a.genre_ids }
    if (a.genres !== undefined) {
        for (const n of a.genres) { genresList.push(n.id); }
    }
    (a.poster_path === undefined || a.poster_path == null) ? a.poster_path = 'img/No_picture_available.png' : a.poster_path = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${a.poster_path}`;
    if (a.type === undefined) { a.type = 'Movie' }
    return [a, genresList];
}

async function checkMovieDetailsFromJson(id, genreArr, type) {
    let planned; let watched;
    const arrTypeWatched = 'watched' + type;
    const arrTypePlanned = 'planned' + type;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    const response_genres = await api_json.get('/genres');
    let genres_query = response_genres.data;
    let genres = [];
    for (const a of genreArr) {
        const x = genres_query.find(e => e.id === a);
        genres.push(x.name);
    }
    data[arrTypePlanned].indexOf(id) !== -1 ? planned = true : planned = false;
    data[arrTypeWatched].indexOf(id) !== -1 ? watched = true : watched = false;
    return [planned, watched, genres]
}

function checkMovieIconPlanned() {
    $(event.target).hasClass('fa-plus-square') ? addToPlanned() : removeFromPlanned();
}
function checkMovieIconWatched() {
    $(event.target).hasClass('fa-eye-slash') ? addToWatched() : removeFromWatched();
}

export { checkMovieDetailsFromResponse, checkMovieDetailsFromJson, checkMovieIconPlanned, checkMovieIconWatched }