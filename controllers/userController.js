const User = require("../models/User");

module.exports = {
    deleteUser : async (req,res)=>{
        try{
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json("Deleted Successfull")
        }
        catch(err){
            res.status(400).json("Unable to delete",err)
        }
    },

    getUser:async(req,res)=>{
        try{
            const user= await User.findById(req.params.id)
            if(!user){
                return res.status(400).json("user doesn't exits")

            }
            const {password,__v,createdAt,updatedAt,...userData} = user._doc 
            res.status(200).json(userData)
        }
        catch(err){
            res.status(400).json(err)

        }
    }

}