function list(req, res, next) {
    res.send('Hello');
}

module.exports = {
    list: list,
}