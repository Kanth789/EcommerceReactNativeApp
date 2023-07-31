const mongoose = require("mongoose");
const Product = require("../models/Products");



module.exports = {
    getLikedProducts: async (req, res) => {
        const productId = req.params.id; 

        try {
            const product = await Product.findOneAndUpdate(
                { "_id": productId },
                { $set: { like: true } },
                { new: true }
            );

            if (!product || !mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ error: "Product not found" });
            }

            res.status(200).json(product);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
};
