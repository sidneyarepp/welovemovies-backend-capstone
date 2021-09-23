const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

//This variable utilizes the mapProperties function to created a nested object that contains all of the critic's information.  This is used in the movieReviews function.
const addCritic = mapProperties({
    critic_id: 'critic.critic_id',
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

//A service function to show all of the movies information found in the database. (/movies)
function list() {
    return knex('movies')
        .select('*');
}

//A service function to show all of the movies found in the database that are currently showing in theaters. (/movies?is_showing=true)
function listMoviesShowing() {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .select('movies.*')
        .where({ "movies_theaters.is_showing": true })
        .groupBy('movies.movie_id');
}

//A service function to read a specific movie's information from the database when the user provides a route parameter of /:movieId.
function read(id) {
    return knex('movies')
        .select('*')
        .where({ movie_id: id })
        .groupBy('movies.movie_id')
        .first();
}

//A service function to show all of the theaters that are currently showing a specific movie when the user provides a route parameter of /:movieId and also provides a route parameter of /theaters.  (/:movieId/theaters)
function movieTheatersShowingMovie(id) {
    return knex('movies_theaters')
        .join('theaters', 'theaters.theater_id', 'movies_theaters.theater_id')
        .select('*')
        .where({ movie_id: id, 'movies_theaters.is_showing': true });
}

//A service function used to pull all of the movie reviews for a particular movie.  This is utilized when a user enters a movieId as a route parameter along with /reviews. (/:movieId/reviews).  The function also utilizes the addCritic variable to create the critic information as a nested object within each review under a "Critic" key.
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