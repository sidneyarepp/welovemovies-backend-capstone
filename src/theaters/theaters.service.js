const knex = require('../db/connection');
const reduceProperties = require('../utils/reduce-properties');

//Variable utilizing the reduceProperties function found in the utils folder.  This is to help create an array called movies which contains objects representing each of the movies currently playing at the theater.
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

//Funciton to return all of the theaters and the movies playing at each.  Before the information is provided to the end user the function utilizes the reduceMovies variable so each movie at the theater is shown in its own object.
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