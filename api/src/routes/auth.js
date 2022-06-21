const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {verifyToken} = require('../middleware/verifyToken')
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', verifyToken, authController.logOut);
router.post('/refresh', verifyToken, authController.requestRefreshToken);

module.exports = router;