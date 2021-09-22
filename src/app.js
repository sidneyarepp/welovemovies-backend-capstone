if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');


app.use(express.json());

//movies route handler
app.use('/movies', moviesRouter);

//reviews route handler
app.use('/reviews', reviewsRouter);

//theaters route handler
app.use('/theaters', theatersRouter);

//Invalid route handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: `Route ${req.originalUrl} is not a valid path.`
    });
});

//Error handler
app.use((error, req, res, next) => {
    const {
        status = 500,
        message = 'Something went wrong!'
    } = error
    res.status(status).json({ error: message });
});



module.exports = app;



