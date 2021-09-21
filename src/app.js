if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');
const movieTheatersRouter = require('./movies_theaters/movies_theaters.router');
const criticsRouter = require('./critics/critics.router');

app.use(express.json());

//movies route handler
app.use('/movies', moviesRouter);

//reviews route handler
app.use('/reviews', reviewsRouter);

//theaters route handler
app.use('/theaters', theatersRouter);

//movie_theaters route handler
app.use('/movies_theaters', movieTheatersRouter);

//critics route handler
app.use('/critics', criticsRouter);

//Invalid found handler
app.use((req, res, next) => {
    return next({
        status: 404,
        message: `Route ${req.originalUrl} is not a valid path.`
    });
});

//Error handler
app.use((req, res) => {
    const {
        status = 500,
        message = 'Something went wrong!',
    } = error
    res.status(status).json({ error: message });
})

module.exports = app;
