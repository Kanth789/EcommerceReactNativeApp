const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')
const app = express();
const port = 3000;
const cloudinary = require('cloudinary')

const productRouter = require('./routes/ProductsRoute');
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const cartRoter = require('./routes/cart')
const orderRouter = require('./routes/order')
const likeRouter = require('./routes/like')
const paymentRouter = require('./routes/paymentRouter')
dotenv.config();
mongoose
  .connect(process.env.MONOGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_KEY,
  api_secret:process.env.CLOUDINARY_SECRET
})

app.use(express.json({limit:'10mb'}))
app.use(cors());
app.use(express.urlencoded({limit:'10mb',extended:true}))
app.use('/api/products',productRouter)
app.use('/api/',authRouter)
app.use('/api/',userRouter)
app.use('/api/carts',cartRoter)
app.use('/api/order',orderRouter)
app.use('/api/product/like/',likeRouter)
app.use('/api/payment/',paymentRouter)

app.listen(process.env.PORT | port, () => console.log(`Example app listening on port ${process.env.PORT}!`));
