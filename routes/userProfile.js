const UserProfileController = require('../controllers/UserProfileController')
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMulter')
const router = require('express').Router()

router.get('/', authMiddleware, UserProfileController.userProfile)
router.get('/add', authMiddleware, UserProfileController.getAddProfile);
router.post('/add', authMiddleware, upload.single('avatarUrl'), UserProfileController.postAddProfile);
router.get('/edit/:id', authMiddleware, UserProfileController.getEditProfile);
router.post('/edit/:id', authMiddleware, upload.single('avatarUrl'), UserProfileController.postEditProfile);
router.get('/public/:id', authMiddleware, UserProfileController.publicProfile);



module.exports = router