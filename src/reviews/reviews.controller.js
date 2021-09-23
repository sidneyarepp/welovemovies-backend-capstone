const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./reviews.service');

//Function to see if a specific review exists within the database.
async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId)
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({
        status: 404,
        message: 'Review cannot be found.'
    });
}

//Function to delete a specific review within the database.
async function deleteReview(req, res) {
    await service.destroy(Number(req.params.reviewId));
    res.sendStatus(204);
}

//Function to update a specific review within the database.
async function update(req, res) {
    const { reviewId } = req.params;
    await service.update(reviewId, req.body.data);
    res.json({ data: await service.getUpdatedReview(Number(reviewId)) })
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(deleteReview)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
}