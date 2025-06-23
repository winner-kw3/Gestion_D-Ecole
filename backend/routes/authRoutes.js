const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me',authMiddleware,  authController.getMe);
// router.get('/users',authMiddleware,  authController.getMe);

module.exports = router;
