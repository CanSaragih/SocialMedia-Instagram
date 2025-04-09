const router = require('express').Router()
const routerLogin = require('./login')
const routerUserProfile = require('./userProfile')
const routerPost = require('./post')
const UserController = require('../controllers/UserController')

router.get('/', (req, res) => {
    res.render('home')
})
router.use('/login', routerLogin)
router.use('/userProfile', routerUserProfile)
router.use('/posts', routerPost)
router.get('/logout', UserController.getLogout)

module.exports = router