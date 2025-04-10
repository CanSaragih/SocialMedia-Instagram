const PostController = require('../controllers/PostController')
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMulter')
const router = require('express').Router()

router.get('/add', authMiddleware, PostController.getPost)
router.post('/add', authMiddleware, upload.single('imgUrl'), PostController.postPost)
router.post('/delete/:id', authMiddleware, PostController.deletePost)
router.get('/tag/:tag', authMiddleware, PostController.filterByTags)



module.exports = router