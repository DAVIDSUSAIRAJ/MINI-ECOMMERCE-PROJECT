const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    cartItems: Array,
    amount: String,
    status: String,
    createdAt: Date,
  }
);

module.exports = mongoose.model("ecommerce_prod", orderSchema, "orders");
//if third argument is not given,then, the first argument will be used as collection name with "plural form"(ex: ecommerce_prods)

