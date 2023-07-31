const Product = require("../models/Products");

module.exports = {
  createProducts: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("Product created successfully");
    } catch (err) {
        console.log(err)
      res.status(500).json("failed to create the product");
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json("failed to get the products");
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
        console.log(err)
      res.status(400).json("failed to get the product");
    }
  },
  searchProduct:async(req,res)=>{
    try{
        const result=  await Product.aggregate(
            [
                {
                  $search: {
                    index: "ecommerce",
                    text: {
                      query: req.params.key,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
              ]
        )
      res.status(200).json(result);
    }
    catch(err){
        res.status(400).json("unable to find the product");
    }
  }
};
