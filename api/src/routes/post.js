const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {verifyToken, verifyTokenAndAdmin} = require('../middleware/verifyToken')
router.get('/', verifyTokenAndAdmin, postController.getPosts);
router.post('/', verifyToken, postController.createPost);
router.get('/:id', verifyToken, postController.getPost);
router.put('/:id', verifyToken, postController.updatePost);
router.delete('/:id', verifyToken, postController.deletePost);

module.exports = router