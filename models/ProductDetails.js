const mongoose = require("mongoose");

const ProductDetailSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    supplier: { type: String, required: true },
    supplierLocation: { type: String, required: true },
    like: { type: Boolean, default: false },
    imageUrl: { public_id: { type: String }, url: { type: String } },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductDetail", ProductDetailSchema);
