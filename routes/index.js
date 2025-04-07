const router = require('express').Router()
const routerLogin = require('./login')
const routerUserProfile = require('./userProfile')

router.use('/login', routerLogin)
router.use('/userProfile', routerUserProfile)

module.exports = router