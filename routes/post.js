const PostController = require('../controllers/PostController')
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMulter')
const router = require('express').Router()

router.get('/add', authMiddleware, PostController.getPost)
router.post('/add', authMiddleware, upload.single('imgUrl'), PostController.postPost)
router.post('/delete/:id', PostController.deletePost)


module.exports = router