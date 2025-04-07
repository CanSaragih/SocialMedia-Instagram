const UserController = require('../controllers/UserController')
const router = require('express').Router()

router.get('/', UserController.getLogin)
router.post('/', UserController.postLogin)
router.get('/register', UserController.getRegister)
router.post('/register', UserController.postRegister)

module.exports = router