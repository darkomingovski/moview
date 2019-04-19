import axios from 'axios';

const serverUrl = `https://api.themoviedb.org/3/movie/550?api_key=bc686fdcbe90e509852ae370ae0a46f7`;
const api = axios.create({
    baseURL: `${serverUrl}`
});
api.defaults.timeout = 4000;

async function getBase() {
    const responseFromBase = await api.get();
    const data =  JSON.stringify(responseFromBase.data);
    const $base = $(`<div>${data}</div>`);
$base.appendTo('body');
}

export {getBase};