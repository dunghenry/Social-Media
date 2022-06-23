const express = require('express');
const router = express.Router();
const {verifyTokenAndUserAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');
const userController = require('../controllers/userController');
router.get('/', verifyTokenAndAdmin, userController.getUsers);
router.get('/:id', verifyTokenAndUserAuthorization, userController.getUser);
router.put('/:id', verifyTokenAndUserAuthorization, userController.updateUser);
router.delete('/:id', verifyTokenAndUserAuthorization, userController.deleteUser);

module.exports = router;