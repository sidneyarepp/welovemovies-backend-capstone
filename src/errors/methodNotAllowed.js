function methodNotAllowed(req, res, next) {
    next({
        status: 405,
        message: `Method ${req.method} is not allowed for route ${req.originalUrl}.`
    })
}

module.exports = methodNotAllowed;