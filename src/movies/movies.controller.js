function list(req, res, next) {
    res.send("hello");
}

module.exports = {
    list: list,
}