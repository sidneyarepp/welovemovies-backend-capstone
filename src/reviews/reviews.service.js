const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties')

//This variable utilizes the mapProperties function in the utilities folder to create a sub-object of the critic data.  This is utilized in the movieReviews function.
const addCritic = mapProperties({
    critic_id: 'critic.critic_id',
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function read(id) {
    return knex('reviews')
        .select('*')
        .where({ 'review_id': id })
        .first();
}


function update(reviewId, updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .update(updatedReview, "*");
}

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