import { checkMovieDetailsFromResponse } from '../compare-db';

let genresList = [];
const response = {
    "vote_average": 6,
    "id": 2103,
    "poster_path": "/8TTniVKEjUWs3DnAMEWMXP6V1ct.jpg",
    "original_title": "Solaris",
    "genre_ids": [
        18,
        878,
        9648,
        10749
    ],
    "type": undefined,
    "release_date": "2002-11-27"
};

const responseEdited = {
    "vote_average": 0,
    "id": 2103,
    "poster_path": null,
    "name": "Solaris",
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        }
    ],
    "type": "TV",
    "first_air_date": "2002-11-27"
};

describe('checkMovieDetailsFromResponse', () => {

    it('should return checked object', () => {
        expect(checkMovieDetailsFromResponse(response, genresList)).toEqual([{ "genre_ids": [18, 878, 9648, 10749], "id": 2103, "original_title": "Solaris", "poster_path": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8TTniVKEjUWs3DnAMEWMXP6V1ct.jpg", "release_date": "2002-11-27", "type": "Movie", "vote_average": 6 }, [18, 878, 9648, 10749]]);
    });

    it('should return checked object', () => {
        expect(checkMovieDetailsFromResponse(responseEdited, genresList)).toEqual([{ "first_air_date": "2002-11-27", "genres": [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 878, "name": "Science Fiction" }], "id": 2103, "name": "Solaris", "original_title": "Solaris", "poster_path": "img/No_picture_available.png", "release_date": "2002-11-27", "type": "TV", "vote_average": "not rated" }, [28, 12, 878]]);
    });

});