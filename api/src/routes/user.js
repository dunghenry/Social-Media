const express = require('express');
const router = express.Router();
const {verifyTokenAndUserAuthorization, verifyTokenAndAdmin, verifyToken} = require('../middleware/verifyToken');
const userController = require('../controllers/userController');
router.get('/', verifyTokenAndAdmin, userController.getUsers);
router.get('/stats', verifyTokenAndAdmin, userController.getUserStats);
router.get('/:id', verifyTokenAndUserAuthorization, userController.getUser);
router.put('/:id', verifyTokenAndUserAuthorization, userController.updateUser);
router.delete('/:id', verifyTokenAndUserAuthorization, userController.deleteUser);
router.put('/followandunfollow/:id', verifyToken, userController.followAndUnfollow);

module.exports = router;