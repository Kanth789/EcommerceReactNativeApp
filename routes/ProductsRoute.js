const router = require("express").Router();

const productsController = require("../controllers/ProductsController");
const productController = require("../controllers/ProductDetailsController");

const multer = require("multer");

const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).single("file");

router.get("/all", productsController.getAllProducts);
router.get("/:id", productsController.getProduct);
router.get("/search/:key", productsController.searchProduct);
router.post("/", productsController.createProducts);
router.get("/product/all", productController.getAllProducts);
router.get("/product/:id", productController.getProduct);
router.post("/product", productController.createProducts);
router.put('/product/:id',productController.updateProducts)
router.delete("/product/:id", productController.deleteProduct);
router.put(
  "/productimage",
  singleUpload,
  productController.uploadProductImage
);
router.post(
    "/productimage",
    singleUpload,
    productController.postProductImage
  );

module.exports = router;
