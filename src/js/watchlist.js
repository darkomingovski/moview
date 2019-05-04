import $ from "jquery";
import { api, api_json } from './main';
import { _renderItems } from './app';

async function addToPlanned() {
    const movie_id = parseInt(event.currentTarget.parentElement.id);
    const type = 'planned' + event.currentTarget.parentElement.parentElement.title;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    if (data[type].includes(movie_id) === false) {
        data[type].push(movie_id);
        await api_json.patch(`/users/${user}`, data);
        $(`#planned_${movie_id}`).toggleClass('fa-plus-square fa-minus-square');
    }
}

async function removeFromPlanned() {
    const movie_id = parseInt(event.currentTarget.parentElement.id);
    const type = 'planned' + event.currentTarget.parentElement.parentElement.title;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    let position = data[type].indexOf(movie_id);
    if (position !== -1) {
        data[type].splice(position, 1);
        await api_json.patch(`/users/${user}`, data);
        $(`#planned_${movie_id}`).toggleClass('fa-minus-square fa-plus-square');
    }
}

async function addToWatched() {
    const movie_id = parseInt(event.currentTarget.parentElement.id);
    const type = 'watched' + event.currentTarget.parentElement.parentElement.title;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    if (data[type].includes(movie_id) === false) {
        data[type].push(movie_id);
        await api_json.patch(`/users/${user}`, data);
        $(`#watched_${movie_id}`).toggleClass('fa-eye-slash fa-eye');
    }
}

async function removeFromWatched() {
    const movie_id = parseInt(event.currentTarget.parentElement.id);
    const type = 'watched' + event.currentTarget.parentElement.parentElement.title;
    const user = localStorage.getItem('id');
    const response = await api_json.get(`/users/${user}`);
    let data = response.data;
    let position = data[type].indexOf(movie_id);
    if (position !== -1) {
        data[type].splice(position, 1);
        await api_json.patch(`/users/${user}`, data);
        $(`#watched_${movie_id}`).toggleClass('fa-eye fa-eye-slash');
    }
}

async function recentlyWatched() {
    const type = 'watched' + event.target.title;
    const user = localStorage.getItem('id');
    const response_json = await api_json.get(`/users/${user}`);
    let resultFromJsonQuery = response_json.data[type];
    let watchedList = []; let $title;
    for (const a of resultFromJsonQuery) {
        const apiType = type.toLowerCase().slice(7);
        const response = await api.get(`/${apiType}/${a}?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
        const resultFromDbQuery = response.data;
        watchedList.push(resultFromDbQuery)
    }
    if (type.slice(7) === 'Movie') {
        $title = $(`<h2>your recently watched movies</h2>`)
    } else {
        $title = $(`<h2>your recently watched tv shows</h2>`)
    }
    _renderItems(watchedList, $title);
}

async function plannedToWatch() {
    const type = 'planned' + event.target.title;
    const user = localStorage.getItem('id');
    const response_json = await api_json.get(`/users/${user}`);
    let resultFromJsonQuery = response_json.data[type];
    let plannedList = []; let $title;
    for (const a of resultFromJsonQuery) {
        const apiType = type.toLowerCase().slice(7);
        const response = await api.get(`/${apiType}/${a}?api_key=bc686fdcbe90e509852ae370ae0a46f7&language=en-US&page=1`);
        const resultFromDbQuery = response.data;
        plannedList.push(resultFromDbQuery);
    }
    if (type.slice(7) === 'Movie') {
        $title = $(`<h2>movies planned to watch</h2>`)
    } else {
        $title = $(`<h2>tv shows planned to watch</h2>`)
    }
    _renderItems(plannedList, $title);
}

export { addToPlanned, removeFromPlanned, addToWatched, removeFromWatched, recentlyWatched, plannedToWatch }