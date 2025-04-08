const router = require('express').Router()
const routerLogin = require('./login')
const routerUserProfile = require('./userProfile')
const routerPost = require('./post')

router.get('/', (req, res) => {
    res.redirect('/login')
})
router.use('/login', routerLogin)
router.use('/userProfile', routerUserProfile)
router.use('/posts', routerPost)

module.exports = router