import axios from 'axios';
import { addToPlanned, removeFromPlanned, addToWatched, removeFromWatched } from './watchlist';

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

function checkMovieDetailsFromResponse(a, genres) {
    if (a.original_title == undefined) { a.original_title = a.name; }
        if (a.release_date == undefined) {
            if (a.first_air_date == undefined) { a.release_date = 'none'; }
            else { a.release_date = a.first_air_date;}
        }
        if (a.vote_average == 0) { a.vote_average = 'not rated';}
        if (a.genres == undefined) { genres = a.genre_ids }
        if (a.genres != undefined) {
            for (const n of a.genres) { genres.push(n.id); }
        }
        a.poster_path == undefined ? a.poster_path = 'img/No_picture_available.png' : a.poster_path = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${a.poster_path}`;
        return [a, genres];
}

async function checkMovieDetailsFromJson(id, genreArr) {
    let planned; let watched;
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
    data.planned.indexOf(id) != -1 ? planned = true : planned = false;
    data.watched.indexOf(id) != -1 ? watched = true : watched = false;
    return [planned, watched, genres]
}

function checkMovieIconPlanned() {
    $(event.target).hasClass('far') ? addToPlanned() : removeFromPlanned();
}
function checkMovieIconWatched() {
    $(event.target).hasClass('far') ? addToWatched() : removeFromWatched();
}

export { checkMovieDetailsFromResponse, checkMovieDetailsFromJson, checkMovieIconPlanned, checkMovieIconWatched }