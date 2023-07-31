const router = require('express').Router()

const cartController = require('../controllers/cartController')

router.get('/find/:id',cartController.getCart)
router.post('/add',cartController.addToCart)
router.delete('/:cartItemId',cartController.deleteCart)
router.post('/quantity',cartController.decrementCart)


module.exports = router