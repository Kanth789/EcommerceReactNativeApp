const router = require('express').Router()

const likeController = require('../controllers/likeController');

router.put('/:id', likeController.getLikedProducts);

module.exports = router