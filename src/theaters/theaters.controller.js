const service = require('./theaters.service');

//Function to list all of the movie theaters, as well as the movies currently showing at each theater.
async function list(req, res, next) {
    const theaters = await service.list();
    res.json({ data: theaters });
}

module.exports = {
    list,
}