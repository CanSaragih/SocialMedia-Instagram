function authMiddleware(req, res, next) {
    if (!req.session.userId) {
        const msgError = 'Please login to continue.'
        return res.redirect(`/login?error=${msgError}`)
    } else {
        next();
    }
}

module.exports = authMiddleware