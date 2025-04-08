const UserProfileController = require('../controllers/UserProfileController')
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMulter')
const router = require('express').Router()


// router.use(function (req, res, next) {
//     if (!req.session.userId) {
//         req.isGuest = true
//     } else {
//         req.isGuest = false
//     }
//     next()
// })

router.get('/', authMiddleware, UserProfileController.userProfile)
router.get('/add', UserProfileController.getAddProfile);
router.post('/add', upload.single('avatarUrl'), UserProfileController.postAddProfile);
router.get('/edit/:id', UserProfileController.getEditProfile);
router.post('/edit/:id', upload.single('avatarUrl'), UserProfileController.postEditProfile);

module.exports = router