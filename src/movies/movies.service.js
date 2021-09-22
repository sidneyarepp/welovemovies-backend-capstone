const knex = require('../db/connection');

function list() {
    return knex('movies')
        .select('movie_id as id', 'title', 'runtime_in_minutes', 'rating', 'image_url');
}


function read(movie_id) {
    return knex('movies')
        .select('movie_id as id', 'title', 'runtime_in_minutes', 'rating', 'description', 'image_url')
        .where({ "movie_id": movie_id });
}


function listMoviesShowing() {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .select('movies.movie_id as id', 'movies.title', 'movies.runtime_in_minutes', 'movies.rating', 'movies.image_url')
        .where({ "is_showing": true });
}


function movieTheatersShowingMovie(movie_id) {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .join('theaters', 'theaters.theater_id', 'movies_theaters.theater_id')
        .select('theaters.*', 'movies_theaters.*')
        .where({ 'movies.movie_id': movie_id, 'movies_theaters.is_showing': true });
}

function movieReviews(movie_id) {
    return knex('movies')
        .join('reviews', 'reviews.movie_id', 'movies.movie_id')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .select('reviews.*', 'critics.*')
        .where({ 'movies.movie_id': movie_id });
}

module.exports = {
    list,
    read,
    listMoviesShowing,
    movieTheatersShowingMovie,
    movieReviews,
}