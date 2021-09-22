const knex = require('../db/connection');

function list() {
    return knex('movies').select('*');
}


function read(movie_id) {
    return knex('movies')
        .select('*')
        .where({ "movie_id": movie_id })
}


function listMoviesShowing() {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .select('movies.*')
        .where({ "is_showing": true });
}


function movieTheatersShowingMovie(movie_id) {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .join('theaters', 'theaters.theater_id', 'movies_theaters.theater_id')
        .select('theaters.*', 'movies_theaters.*')
        .where({ 'movies.movie_id': movie_id, 'movies_theaters.is_showing': true })
}

module.exports = {
    list,
    read,
    listMoviesShowing,
    movieTheatersShowingMovie,
}