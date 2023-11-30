const ProductDetails = require("../models/ProductDetails");
const { getDataUri } = require("../utils/feature");
const cloudinary = require("cloudinary");
const  mongoose  =  require("mongoose")

module.exports = {
  createProducts: async (req, res) => {
    const newProduct = new ProductDetails(req.body);
    try {
      await newProduct.save();
      res.status(200).json("Product created successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json("failed to create the product");
    }
  },
  updateProducts: async (req, res) => {
    const { id } = req.params;
    const { title, description, supplier, supplierlocation, price,imageUrl } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No product with id: ${id}`);

    const updateProduct = {
      title,
      description,
      supplier,
      supplierlocation,
      price,
      _id: id,
      imageUrl
    };

    await ProductDetails.findByIdAndUpdate(id, updateProduct, { new: true });

    res.json(updateProduct);
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await ProductDetails.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json("failed to get the products");
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await ProductDetails.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
      res.status(400).json("failed to get the product");
    }
  },
  searchProduct: async (req, res) => {
    try {
      const result = await ProductDetails.aggregate([
        {
          $search: {
            index: "ecommerce",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json("unable to find the product");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await ProductDetails.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted Successfull");
    } catch (err) {
      res.status(400).json("Unable to delete", err);
    }
  },
  uploadProductImage: async (req, res) => {
    try {
      const id = await ProductDetails.findById(req.params.id);

      const file = getDataUri(req.file);
      await cloudinary.v2.uploader.destroy(ProductDetails.imageUrl.public_id);
      const data = await cloudinary.v2.uploader.upload(file.content);
      id.imageUrl = {
        public_id: data.public_id,
        url: data.secure_url,
      };

      await ProductDetails.save();
      res.status(200).json("Image Uploaded Successful");
    } catch (err) {
      res.status(400).json("file uploading fail", err);
    }
  },
  postProductImage: async (req, res) => {
    try {
      const file = getDataUri(req.file);
      const data = await cloudinary.v2.uploader.upload(file.content);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json("file uploading fail", err);
    }
  },
};
