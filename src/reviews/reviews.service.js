const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties')

//This variable utilizes the mapProperties function in the utilities folder to create a sub-object of the critic data.  This is utilized in the getUpdatedReview function.
const addCritic = mapProperties({
    critic_id: 'critic.critic_id',
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

//Function to get the information for a specific review. This function is used to determine if a review exists in the database before moving on to the update or delete functions in the controller file.
function read(id) {
    return knex('reviews')
        .select('*')
        .where({ 'review_id': id })
        .first();
}

//Function to update a specific review when given a reviewId and updated review object.
function update(reviewId, updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .update(updatedReview, "*");
}

//Function to get a review after it has been updated, and within the review information nest the critic information by utilizing the addCritic variable.
function getUpdatedReview(id) {
    return knex('reviews')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .select('*')
        .where({ 'review_id': id })
        .first()
        .then(result => {
            const updatedRecord = addCritic(result);
            updatedRecord.critic_id = updatedRecord.critic.critic_id;
            return updatedRecord;
        });
}

//Function to delete a specific review when provided with the review's id.
function destroy(id) {
    return knex('reviews')
        .where({ 'review_id': id })
        .del();
}

module.exports = {
    read,
    update,
    destroy,
    getUpdatedReview,
}