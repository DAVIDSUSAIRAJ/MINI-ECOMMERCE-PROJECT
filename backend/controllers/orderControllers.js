const mongoose = require("mongoose")
const ordersModel = require("../models/ordersModel");
const productsModel = require("../models/productsModel");


const getOrders = async (req,res,next)=>{
    try {
        const orders = await ordersModel.find({});
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
    // res.json({
    //     success:true,
    //     message:"get all products orders"

    // })

}

const createOrder = async (req,res,next)=>{

    try {
        const cartItems = req.body;
        const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2)
        const status = 'bending'
        await ordersModel.create({cartItems,amount,status})
        res.status(200).json({
            message:"success"
        });

// update product stock
        for (const item of cartItems) {
            const product = await productsModel.findById(item.product._id);
            product.stock -= Number(item.qty);
            await product.save();
        }



    } catch (error) {
        res.status(400).json({message:error.message});
    }


}
module.exports = {
    getOrders,
    createOrder,
}