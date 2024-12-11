const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  createdAt: Date,
});

module.exports = mongoose.model("ecommerce_prodUser", userSchema, "users");
//if third argument is not given,then, the first argument will be used as collection name with "plural form"(ex: ecommerce_prods)
