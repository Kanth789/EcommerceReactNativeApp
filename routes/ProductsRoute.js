const router  = require('express').Router()

const productController = require('../controllers/ProductsController')

router.get('/all',productController.getAllProducts)
router.get('/:id',productController.getProduct)
router.get('/search/:key',productController.searchProduct)
router.post('/',productController.createProducts)


module.exports = router