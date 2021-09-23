const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

const addCritic = mapProperties({
    critic_id: 'critic.critic_id',
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function list() {
    return knex('movies')
        .select('*');
}


function listMoviesShowing() {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .select('movies.*')
        .where({ "movies_theaters.is_showing": true })
        .groupBy('movies.movie_id');
}


function read(id) {
    return knex('movies')
        .select('*')
        .where({ movie_id: id })
        .groupBy('movies.movie_id')
        .first();
}


function movieTheatersShowingMovie(id) {
    return knex('movies_theaters')
        .join('theaters', 'theaters.theater_id', 'movies_theaters.theater_id')
        .select('*')
        .where({ movie_id: id, 'movies_theaters.is_showing': true });
}


function movieReviews(id) {
    return knex('movies')
        .join('reviews', 'reviews.movie_id', 'movies.movie_id')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .select('*')
        .where({ 'reviews.movie_id': id })
        .then((result) => {
            const movieList = [];
            result.forEach(item => {
                const appendedObject = addCritic(item);
                movieList.push(appendedObject);
            });
            return movieList;
        });
}


module.exports = {
    list,
    read,
    listMoviesShowing,
    movieTheatersShowingMovie,
    movieReviews,
}