const mongoose = require("mongoose")
const productsModel = require("../models/productsModel");


const getProducts = async (req,res,next)=>{
    try {
        const products = await productsModel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
    // res.json({
    //     success:true,
    //     message:"get all products"

    // })

}
const getSingleProduct = async (req,res,next)=>{
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({error:"Invalid id"});
        }
        const singleProduct = await productsModel.findById(id);
        res.status(200).json(singleProduct)
      } catch (error) {
          res.status(400)
          res.json({message:error.message});
      }
    //     res.json({
    //     success:true,
    //     message:"get single products"

    // })

}
module.exports = {
    getProducts,
    getSingleProduct,
}