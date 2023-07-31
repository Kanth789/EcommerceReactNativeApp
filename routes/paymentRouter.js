const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51NZqzLSGIuWDH3VaPpCxx0RpGWNgpiPCvw8TfRzH4rhaupRlCNB6CEO2seKpmKc7dxfd3Jg306VT0lEPln1VwAJa0014D93wpj"
);

router.post("/intents", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntent.create({
      amount: req.body.amount,
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({error:err.message})
  }
});

module.exports = router;
