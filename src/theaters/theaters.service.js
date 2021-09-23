const knex = require('../db/connection');
const reduceProperties = require('../utils/reduce-properties');

const reduceMovies = reduceProperties(
    "theater_id",
    {
        movie_id: ['movies', null, 'movie_id'],
        title: ['movies', null, 'title'],
        runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
        rating: ['movies', null, 'rating'],
        description: ['movies', null, 'description'],
        image_url: ['movies', null, 'image_url'],
    }
)

function list() {
    return knex('theaters')
        .join('movies_theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
        .join('movies', 'movies_theaters.movie_id', 'movies.movie_id')
        .select('*')
        .then(reduceMovies);
}

module.exports = {
    list,
}