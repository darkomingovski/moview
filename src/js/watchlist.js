import $ from "jquery";
import { api, api_json } from './main';
import { _renderItems } from './app';

async function addToPlanned() {
    const movie_id = parseInt(event.currentTarget.parentElement.id);
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    if (data.planned.includes(movie_id) === false) {
        data.planned.push(movie_id);
        await api_json.patch(`/users/${user}`, data);
        $(`#planned_${movie_id}`).toggleClass('fa-plus-square fa-minus-square');
    }
}

async function removeFromPlanned() {
    const movie_id = parseInt(event.currentTarget.parentElement.id);
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    let position = data.planned.indexOf(movie_id);
    if (position !== -1) {
        data.planned.splice(position,1);
        await api_json.patch(`/users/${user}`, data);
        $(`#planned_${movie_id}`).toggleClass('fa-minus-square fa-plus-square');
    }
}

async function addToWatched() {
    const movie_id = parseInt(event.currentTarget.parentElement.id);
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    if (data.watched.includes(movie_id) === false) {
        data.watched.push(movie_id);
        await api_json.patch(`/users/${user}`, data);
        $(`#watched_${movie_id}`).toggleClass('fa-eye-slash fa-eye');
    }
}

async function removeFromWatched() {
    const movie_id = parseInt(event.currentTarget.parentElement.id);
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    let position = data.watched.indexOf(movie_id);
    if (position !== -1) {
        data.watched.splice(position,1);
        await api_json.patch(`/users/${user}`, data);
        $(`#watched_${movie_id}`).toggleClass('fa-eye fa-eye-slash');
    }
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
    _renderItems(watchedList, $title);
}

async function plannedToWatch() {
    const user = localStorage.getItem('id');
    const response_json = await api_json.get(`/users/${user}`);
    let resultFromJsonQuery = response_json.data.planned;
    let plannedList = [];
    for (const a of resultFromJsonQuery) {
        const response = await api.get(`/movie/${a}?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
        const resultFromDbQuery = response.data;
        plannedList.push(resultFromDbQuery);
    }
    let $title = $(`<h2>movies planned to watch</h2>`);
    _renderItems(plannedList, $title);
}

export { addToPlanned, removeFromPlanned, addToWatched, removeFromWatched, recentlyWatched, plannedToWatch }