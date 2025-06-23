const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, authController.getAllUsers);
router.delete('/:id', authMiddleware, authController.deleteUser);


module.exports = router;