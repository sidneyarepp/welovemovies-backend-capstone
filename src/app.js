if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require('./movies/movies.router');

app.use(express.json());

//Movies route handler
app.use('/movies', moviesRouter);

//Route not found handler
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
