const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');


//Initial check to see if the movieId provided exists in the database.
async function movieExists(req, res, next) {
    const movie = await service.read(Number(req.params.movieId));
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 404,
        message: 'Movie cannot be found.'
    });
}

//Function used to list all movies showing in the database.  If the user adds the query param of "is_showing=true" the function only returns the movies that are currently showing in theaters.
async function list(req, res) {
    const isShowing = req.query.is_showing;

    if (isShowing) {
        const showingMovies = await service.listMoviesShowing();
        res.json({ data: showingMovies })
    }

    const allMovies = await service.list();
    res.json({ data: allMovies });
}

//Function used to return a specific movie if the user adds a router param of movieId.
function read(req, res) {
    const movie = res.locals.movie;
    res.json({ data: movie });
}

//Function used to return a list of theaters currently showing a movie when the user enters a movieId as a route parameter and also adds a query parameter of "is_showing=true"
async function movieTheatersShowingMovie(req, res) {
    const theaters = await service.movieTheatersShowingMovie(Number(req.params.movieId));
    res.json({ data: theaters })
}

//Function to return all of the movie reviews for a specific movie if they provide the movieId in the url params.
async function movieReviews(req, res) {
    const reviews = await service.movieReviews(Number(req.params.movieId));
    res.json({ data: reviews })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    movieTheatersShowingMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieTheatersShowingMovie)],
    movieReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieReviews)],
}