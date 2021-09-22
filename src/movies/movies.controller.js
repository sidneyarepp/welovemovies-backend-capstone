const service = require('./movies.service');

//Initial check to see if the movieId provided exists in the database.
async function movieExists(req, res, next) {
    const movie_id = Number(req.params.movieId);
    const movie = service.read(movie_id);
    if (movie) {
        res.locals.movie = movie;
        next();
    }
    next({
        status: 404,
        message: 'Movie cannot be found.'
    })
}

//Function used to list all movies showing in the database.  If the user adds the query param of "is_showing=true" the function only returns the movies that are currently showing in theaters.
async function list(req, res) {
    const isShowingParam = req.query.is_showing;

    if (isShowingParam) {
        const data = await service.listMoviesShowing();
        res.json({ data })
    }

    const data = await service.list();
    res.json({ data });
}

//Function used to return a specific movie if the user adds a router param of movieId.
async function read(req, res) {
    const movie = res.locals.movie;
    res.json({ data: movie });
}

async function movieTheatersShowingMovie(req, res) {
    const data = service.movieTheatersShowingMovie(Number(req.params.movieId));
    res.json({ data })
}

module.exports = {
    list: list,
    read: [movieExists, read],
    movieTheatersShowingMovie: movieTheatersShowingMovie,
}