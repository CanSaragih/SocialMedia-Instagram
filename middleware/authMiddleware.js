function authMiddleware(req, res, next) {
    if (!req.session.userId) {
        const msgError = 'Please login to continue.'
        return res.redirect(`/login?error=${msgError}`)
    } else {
        next();
    }
}

function adminOnly(req, res, next) {
    if (req.session.role !== 'admin') {
        const msgError = 'Access denied. Admin only.'
        return res.redirect(`/login?error=${msgError}`)
    }
    next()
}

module.exports = { authMiddleware, adminOnly }