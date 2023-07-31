const Order = require("../models/order");

module.exports = {
  getUserOrders: async (req, res) => {
    const userId = req.params.id;
    try {
      const userOrder = await Order.find({ userId })
        .populate({
          path: "productId",
          select: "-description -product_location",
        })
        .exec();

        res.status(200).json(userOrder)
    } catch (err) {
      res.staus(400).json(err);
    }
  },
};
