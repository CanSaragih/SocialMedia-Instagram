const UserProfileController = require('../controllers/UserProfileController')
const router = require('express').Router()

router.use(function (req, res, next) {
    if (!req.session.userId) {
        const msgError = 'Please login first!'
        res.redirect(`/login?error=${msgError}`)
    } else {
        next()
    }
})

router.get('/', UserProfileController.userProfile)

module.exports = router