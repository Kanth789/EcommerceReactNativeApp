const User = require('../models/User')

const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

module.exports = {
    createUser:async(req,res)=>{
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET).toString(),
            location:req.body.location
        })

        try{
            await newUser.save()
            res.status(201).json({message:"Account Created Successful"})
        }
        catch(err){
            res.status(500).json({message:err})

        }
    },

     loginUser : async (req, res) => {
        console.log(req.body.email)
        try {
          const user = await User.findOne({ email: req.body.email });
          if (!user) {
            return res.status(401).json({ message: "Please Enter the valid Credentials" });
          }
      
          const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
          const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8);
          if (decryptedPass !== req.body.password) {
            return res.status(401).json({ message: "Wrong Password" });
          }
      
          const userToken = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, { expiresIn: "7d" });
      
          const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
      
          return res.status(200).json({ ...userData, token: userToken });
        } catch (err) {
          return res.status(400).json({ message: err.message });
        }
      }
      
}