const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: String,
    price: String,
    description: String,
    ratings: String,
    images : [
        {
            image: String
        }
    ],
    category: String,
    seller: String,
    stock: String,
    numOfReviews: String,
    createdAt: Date

});

module.exports = mongoose.model("product",productsSchema,)
//the first argument is the name of the collection,it will be used as collection name with "plural form"(ex: products) here "s" added automatically
