const router = require('express').Router()
const routerLogin = require('./login')
const routerUserProfile = require('./userProfile')
const routerPost = require('./post')
const UserController = require('../controllers/UserController')
const UserProfileController = require('../controllers/UserProfileController')
const AdminController = require('../controllers/AdminController')
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware')


router.get('/', (req, res) => {
    res.render('home')
})
router.use('/login', routerLogin)
router.use('/userProfile', routerUserProfile)
router.use('/posts', routerPost)

router.get('/adminDashboard', adminOnly, AdminController.dashboardAdmin)
router.get('/search', authMiddleware, UserProfileController.searchUser)
router.get('/logout', authMiddleware, UserController.getLogout)


module.exports = router