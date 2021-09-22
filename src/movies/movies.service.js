const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

//This variable utilizes the mapProperties function in the utilities folder to create a sub-object of the critic data.  This is utilized in the movieReviews function.
const addCritic = mapProperties({
    critic_id: 'critic.critic_id',
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

//Function to list all of the movies in the movies database.
function list() {
    return knex('movies')
        .select('*')
}

//Function to list all of the theaters where a specified movie is showing.  The movieId is listed as a route parameter.
function listMoviesShowing() {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .select('movies.*')
        .where({ "movies_theaters.is_showing": true })
        .groupBy('movies.movie_id');
}

//Function to return all of the information about a movie when the user specifies a particular movieId in the route params.
function read(id) {
    return knex('movies')
        .select('*')
        .where({ movie_id: id })
        .groupBy('movies.movie_id')
        .first();
}

//Function to show all of the movie theaters where a particular movie is currently showing.  This requires the user to navigate to route /:movieId/theaters.
function movieTheatersShowingMovie(id) {
    return knex('movies_theaters')
        .join('theaters', 'theaters.theater_id', 'movies_theaters.theater_id')
        .select('*')
        .where({ 'movie_id': id, 'movies_theaters.is_showing': true });
}

//Function to show all movie reviews for a particular movie.  This requires the user to navigate to the route /:movieId/reviews.  The critics sub-object is created by utilizing the mapProperties function above.
function movieReviews(id) {
    return knex('movies')
        .join('reviews', 'reviews.movie_id', 'movies.movie_id')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .select('*')
        .where({ 'reviews.movie_id': id })
        .then(result => {
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